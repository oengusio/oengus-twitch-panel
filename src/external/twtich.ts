// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Twitch } from 'twitch-ext';

type ConfigLambda = (config: object) => void;

let configCallback: ConfigLambda = (config: object): void => {
  console.log('default config callback', config);
};

Twitch.ext.listen(
  'broadcast',
  (target: string, contentType: string, message: string) => {
    const msg = JSON.parse(message);

    switch (msg.type) {
      case 'CONFIG_UPDATE':
        configCallback(msg.config);
        break;
    }
  }
);

function getParsedConfig(): object {
  const configRaw = Twitch.ext.configuration.broadcaster?.content ?? '{}';

  return JSON.parse(configRaw);
}

export function loadConfig(callback: ConfigLambda): void {
  configCallback = callback;

  Twitch.ext.configuration.onChanged(() => {
    //log('config changed');
    callback(getParsedConfig());
  });
}

Twitch.ext.onError((err: any) => {
  console.error(err);
});

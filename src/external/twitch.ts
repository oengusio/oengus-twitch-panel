// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type Twitch from 'twitch-ext';
import type { configUnion } from '@/types';

type ConfigLambda = (config: Partial<configUnion>) => void;

let configCallback: ConfigLambda = (config: object): void => {
  console.log('[oengus] default config callback', config);
};

// @ts-ignore import is required.
Twitch.ext.onError((err: any) => {
  console.error('[oengus]', err);
});

// @ts-ignore import is required.
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

export function followRunner(username: string) {
// @ts-ignore import is required.
  Twitch.ext.actions.followChannel(username);
}

const waitingForFollow: {
  channelName: string;
  callback: (didFollow: boolean) => void;
}[] = [];

// @ts-ignore import is required.
Twitch.ext.actions.onFollow((didFollow: boolean, channelName: string) => {
  console.log(
    '[oengus] follow callback',
    JSON.stringify({ didFollow, channelName })
  );

  const waiting = waitingForFollow.filter((w) => w.channelName === channelName);

  waiting.forEach((w) => {
    w.callback(didFollow);

    const idx = waitingForFollow.indexOf(w);

    if (idx > -1) {
      waitingForFollow.splice(idx, 1);
    }
  });
});

export async function waitForTwitchFollow(
  channelName: string
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    waitingForFollow.push({
      channelName,
      callback: resolve,
    });
  });
}

function getParsedConfig(): Partial<configUnion> {
// @ts-ignore import is required.
  const configRaw = Twitch.ext.configuration.broadcaster?.content ?? '{}';

  return JSON.parse(configRaw);
}

export function updateTwitchConfig(config: configUnion): void {
// @ts-ignore import is required.
  Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(config));

  // notify the extension about the updated config
// @ts-ignore import is required.
  Twitch.ext.send('broadcast', 'application/json', {
    type: 'CONFIG_UPDATE',
    config,
  });
}

/**
 * Important: ONLY EVER CALL THIS FUNCTION ONCE
 */
export function loadTwitchConfig(callback: ConfigLambda): void {
  configCallback = callback;
  // configCallback(getParsedConfig());

  // we can use this to check for the config being loaded
// @ts-ignore import is required.
  Twitch.ext.configuration.onChanged(() => {
    configCallback(getParsedConfig());
  });
}

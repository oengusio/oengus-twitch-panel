// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type Twitch from 'twitch-ext';
import type { Config } from '@/types/OengusTypes';

type ConfigLambda = (config: Partial<Config>) => void;

let configCallback: ConfigLambda = (config: object): void => {
  console.log('[oengus] default config callback', config);
};

Twitch.ext.onError((err: any) => {
  console.error('[oengus]', err);
});

Twitch.ext.onAuthorized((auth) => {
  console.log('[oengus] auth viewer linked', Twitch.ext.viewer.isLinked); // true if user has opted to share id
  console.log('[oengus] auth user id', auth.userId);
});

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

export function triggerIdShareOverlay() {
  Twitch.ext.actions.requestIdShare();
}

export function hasSharedId(): boolean {
  return Twitch.ext.viewer.isLinked;
}

export function followRunner(username: string) {
  Twitch.ext.actions.followChannel(username);
}

function getParsedConfig(): Partial<Config> {
  const configRaw = Twitch.ext.configuration.broadcaster?.content ?? '{}';

  return JSON.parse(configRaw);
}

export function updateTwitchConfig(config: Config): void {
  Twitch.ext.configuration.set('broadcaster', '1.0', JSON.stringify(config));

  // notify the extension about the updated config
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
  Twitch.ext.configuration.onChanged(() => {
    configCallback(getParsedConfig());
  });
}

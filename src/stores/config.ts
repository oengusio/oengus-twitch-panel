import { defineStore } from 'pinia';
import type { Config } from '@/types/OengusTypes';
import { loadTwitchConfig, updateTwitchConfig } from '@/external/twitch';

interface ConfigType {
  loaded: boolean;
  marathonConfig: Config;
}

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigType => ({
    loaded: false,
    marathonConfig: {
      marathonId: '',
      marathonName: null,
      domain: 'oengus.io',
    },
  }),
  getters: {
    //
  },
  actions: {
    saveToTwitch(): void {
      updateTwitchConfig(this.marathonConfig);
    },
    async loadSettingsFromTwitch(): Promise<void> {
      console.log('[oengus] loading twitch settings', this.loaded);

      if (this.loaded) {
        return;
      }

      let resolveFn: (value: void) => void;
      const prom = new Promise<void>((resolve) => {
        resolveFn = resolve;
      });

      loadTwitchConfig((cfg) => {
        console.log('[oengus] twitch settings loaded');
        this.$patch({
          marathonConfig: {
            ...cfg,
          },
        });

        this.loaded = true;
        resolveFn();
      });

      return prom;
    },
  },
});

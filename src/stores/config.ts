import { defineStore } from 'pinia';
import type { Config } from '@/types/OengusTypes';
import { loadTwitchConfig } from '@/external/twitch';

interface ConfigType {
  loaded: boolean;
  marathonConfig: Config;
}

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigType => ({
    loaded: true,
    marathonConfig: {
      marathonId: 'bsg2022',
      marathonName: null,
      domain: 'oengus.io',
    },
  }),
  getters: {
    //
  },
  actions: {
    async loadSettingsFromTwitch(): Promise<void> {
      if (this.loaded) {
        return;
      }

      let resolveFn: (value: void) => void;
      const prom = new Promise<void>((resolve) => {
        resolveFn = resolve;
      });

      loadTwitchConfig((cfg) => {
        this.$patch({
          marathonConfig: {
            ...cfg,
          },
        });
        if (!this.loaded) {
          this.loaded = true;
          resolveFn();
        }
      });

      return prom;
    },
  },
});

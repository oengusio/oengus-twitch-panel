import { defineStore } from 'pinia';
import type { Config } from '@/types/OengusTypes';

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
    setMarathonConfig(newConfig: Config) {
      this.marathonConfig = newConfig;
      this.loaded = true;
    },
  },
});

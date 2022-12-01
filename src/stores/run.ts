import { defineStore } from 'pinia';
import type { TickerRun } from '@/types/OengusTypes';

export const useRunStore = defineStore({
  id: 'run',
  state: () => ({
    next: null as TickerRun | null,
    current: null as TickerRun | null,
  }),
  getters: {
    hasRuns(): boolean {
      return this.next !== null || this.current !== null;
    },
  },
  actions: {
    getLineById(id: number): TickerRun | null {
      if (this.current && this.current.id === id) {
        return this.current;
      }

      if (this.next && this.next.id === id) {
        return this.next;
      }

      return null;
    },
  },
});

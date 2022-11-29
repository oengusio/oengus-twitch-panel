import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import { oengusApi } from '@/apis/oengus';
import type { Store } from 'pinia';
import type { TickerRun } from '@/types/OengusTypes';

class TickerTimer {
  private marathonShort = '';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore (this works)
  private runStore: Store<
    'run',
    {
      next: TickerRun | null;
      current: TickerRun | null;
    }
  >;

  setup() {
    const curr = new Date();
    const startInterval = () => {
      // update every 60 seconds
      setInterval(() => {
        this.doTick();
      }, 30 * 1000);
    };

    const secUntilNextMin = 30 - curr.getSeconds();
    setTimeout(startInterval, secUntilNextMin * 1000);

    this.runStore = useRunStore();

    const configStore = useConfigStore();

    this.marathonShort = configStore.marathonConfig.marathonId || '';

    configStore.$subscribe(() => {
      this.marathonShort = configStore.marathonConfig.marathonId || '';
      this.refreshTicker();
    });

    this.refreshTicker();
  }

  private doTick(): void {
    console.log('[oengus] tick!');
    this.refreshTicker();
  }

  private async refreshTicker(): Promise<void> {
    console.log(
      '[oengus] ticker update, current short',
      JSON.stringify(this.marathonShort)
    );

    if (!this.marathonShort) {
      this.runStore.$patch({
        next: null,
        current: null,
      });
      return;
    }

    const data = await oengusApi.getTickerData(this.marathonShort);

    if (data === null) {
      // reset store?
      return;
    }

    const { current, next } = data;

    this.runStore.$patch({ current, next });
  }
}

export const tickerTimer = new TickerTimer();

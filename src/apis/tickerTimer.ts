import { useConfigStore } from '@/stores/config';
import { useRunStore } from '@/stores/run';
import { oengusApi } from '@/apis/oengus';
import type { Store } from 'pinia';
import type { TickerRun } from '@/types/OengusTypes';
import { horaroApi } from '@/apis/horaro';
import { parseToOengusData } from '@/helpers/horaroHelpers';

class TickerTimer {
  private marathonShort = '';
  private scheduleId = -1;
  private type: 'OENGUS' | 'HORARO' = 'OENGUS';
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
    this.scheduleId = configStore.marathonConfig.scheduleId || -1;
    this.type = configStore.marathonConfig.type || 'OENGUS';

    configStore.$subscribe(() => {
      this.marathonShort = configStore.marathonConfig.marathonId || '';
      this.scheduleId = configStore.marathonConfig.scheduleId || -1;
      this.type = configStore.marathonConfig.type || 'OENGUS';
      this.refreshTicker();
    });

    this.refreshTicker();
  }

  private doTick(): void {
    console.log('[oengus] tick!');
    this.refreshTicker();
  }

  private async refreshTicker(): Promise<void> {
    // TODO: make a better algorithm
    console.log(
      '[oengus] ticker update, current short',
      JSON.stringify(this.marathonShort)
    );

    if (!this.marathonShort || this.scheduleId < 1) {
      this.runStore.$patch({
        next: null,
        current: null,
      });
      return;
    }

    const data =
      this.type === 'OENGUS'
        ? await oengusApi.getTickerData(this.marathonShort, this.scheduleId)
        : await parseToOengusData(horaroApi.getTickerData(this.marathonShort));

    if (data === null) {
      // reset store?
      return;
    }

    const { current, next } = data;

    this.runStore.$patch({ current, next });
  }
}

export const tickerTimer = new TickerTimer();

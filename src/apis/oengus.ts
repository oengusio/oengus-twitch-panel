import type { TickerData, LineRunner, V2Schedule } from '@/types/OengusTypes';
import { useConfigStore } from '@/stores/config';

class OengusAPI {
  private oengusDomain = 'oengus.io';

  subscribeToStore() {
    const store = useConfigStore();

    store.$subscribe(() => {
      const mc = store.marathonConfig;

      this.oengusDomain = mc.oengusDomain || mc.domain;
    });
  }

  private get apiClean(): string {
    return `https://${this.oengusDomain}/api`;
  }

  private get apiBase(): string {
    return `${this.apiClean}/v2`;
  }

  public getAvatarUrl(username: string): string {
    return `${this.apiClean}/v2/users/${username}/avatar`;
  }

  public async getMarathonName(short: string): Promise<string> {
    const res = await fetch(`${this.apiClean}/v1/marathons/${short}`, {
      headers: {
        'User-Agent': 'OengusIO Twitch Panel',
      },
    });

    if (res.status === 404) {
      throw new Error('Marathon not found');
    }

    const json = await res.json();

    return json.name as string;
  }

  public async getUserInfo(username: string): Promise<LineRunner | null> {
    const res = await fetch(`${this.apiBase}/users/${username}`, {
      headers: {
        'User-Agent': 'OengusIO Twitch Panel',
      },
    });

    if (res.status === 404) {
      return null;
    }

    return res.json();
  }

  public async lookupSchedule(
    marathonId: string,
    slug: string
  ): Promise<V2Schedule | null> {
    const res = await fetch(
      `${this.apiBase}/marathons/${marathonId}/schedules/for-slug/${slug}`,
      {
        headers: {
          'User-Agent': 'OengusIO Twitch Panel',
        },
      }
    );

    if (res.status !== 200) {
      return null;
    }

    return await res.json();
  }

  public async getTickerData(
    shortCode: string,
    scheduleId: number
  ): Promise<TickerData | null> {
    const res = await fetch(
      `${this.apiBase}/marathons/${shortCode}/schedules/${scheduleId}/ticker`,
      {
        headers: {
          'User-Agent': 'OengusIO Twitch Panel',
        },
      }
    );

    if (res.status !== 200) {
      return null;
    }

    return await res.json();
  }
}

export const oengusApi = new OengusAPI();

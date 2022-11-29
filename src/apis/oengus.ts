import type { TickerData, RunnerInfo } from '@/types/OengusTypes';
import { useConfigStore } from '@/stores/config';

class OengusAPI {
  private oengusDomain = 'oengus.io';

  subscribeToStore() {
    const store = useConfigStore();

    store.$subscribe(() => {
      console.log(store.marathonConfig.domain);
      this.oengusDomain = store.marathonConfig.domain;
    });
  }

  private get apiBase(): string {
    return `https://${this.oengusDomain}/api/v1`;
  }

  public getAvatarUrl(username: string): string {
    return `${this.apiBase}/users/${username}/avatar`;
  }

  // TODO: domain part here is stupid
  public async getMarathonName(short: string, domain = ''): Promise<string> {
    let base = this.apiBase;

    if (domain) {
      base = base.replace(this.oengusDomain, domain);
    }

    const res = await fetch(`${base}/marathons/${short}`, {
      headers: {
        'User-Agent': 'OengusIO Twitch Panel',
      },
    });

    if (res.status === 404) {
      throw new Error('Marathon now found');
    }

    const json = await res.json();

    return json.name as string;
  }

  public async getUserInfo(username: string): Promise<RunnerInfo | null> {
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

  public async getTickerData(shortCode: string): Promise<TickerData | null> {
    const res = await fetch(
      `${this.apiBase}/marathons/${shortCode}/schedule/ticker`,
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

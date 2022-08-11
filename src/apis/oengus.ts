import type { TickerData } from '@/types/OengusTypes';

class OengusAPI {
  private readonly apiBase: string;

  constructor(private oengusDomain: string) {
    this.apiBase = `https://${oengusDomain}/api/v1`;
  }

  public async getTickerData(shortCode: string): Promise<TickerData> {
    const res = await fetch(
      `${this.apiBase}/marathons/${shortCode}/schedule/ticker`,
      {
        headers: {
          'User-Agent': 'OengusIO Twitch Panel',
        },
      }
    );

    return await res.json();
  }
}

export const oengusApi = new OengusAPI('oengus.io');

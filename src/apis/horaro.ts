import type { HoraroResponse, HoraroTickerData } from '@/types';

class HoraroApi {
  // https://app.esamarathon.dev/horaro-proxy/v2/esa/schedule/https://horaro.org/esa/2023-winter1
  private get apiBase(): string {
    // TODO: use esa horaro proxy?
    return 'https://cors.redoc.ly/https://horaro.org/-/api/v1';
  }

  public async loadBasicScheduleInfo(
    event: string,
    scheduleSlug: string
  ): Promise<HoraroTickerData> {
    const res = await fetch(
      `${this.apiBase}/events/${event}/schedules/${scheduleSlug}/ticker`,
      {
        headers: {
          'User-Agent': 'OengusIO Twitch Panel',
        },
      }
    );

    if (res.status === 404) {
      throw new Error('Event or schedule not found');
    }

    const json: HoraroResponse<HoraroTickerData> = await res.json();

    return json.data;
  }

  public async getTickerData(
    scheduleId: string
  ): Promise<HoraroTickerData | null> {
    const res = await fetch(`${this.apiBase}/schedules/${scheduleId}/ticker`, {
      headers: {
        'User-Agent': 'OengusIO Twitch Panel',
      },
    });

    if (res.status === 404) {
      return null;
    }

    return await res.json();
  }
}

export const horaroApi = new HoraroApi();

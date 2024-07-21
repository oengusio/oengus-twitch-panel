import type { HoraroResponse, HoraroTickerData } from '@/types';

class HoraroApi {
  private get apiBase(): string {
    return 'https://app.esamarathon.com/horaro-proxy/api_proxy/';
  }

  private horaroUrl(path: string): string {
    return `${this.apiBase}${encodeURIComponent(
      `https://horaro.org/-/api/v1${path}`
    )}`;
  }

  public async loadBasicScheduleInfo(
    event: string,
    scheduleSlug: string
  ): Promise<HoraroTickerData> {
    const res = await fetch(
      this.horaroUrl(`/events/${event}/schedules/${scheduleSlug}/ticker`),
      {
        headers: {
          'User-Agent': 'OengusIO Twitch Panel',
        },
      }
    );

    console.log(res);

    if (res.status === 404) {
      throw new Error('Event or schedule not found');
    }

    const json: HoraroResponse<HoraroTickerData> = await res.json();

    return json.data;
  }

  public async getTickerData(
    scheduleId: string
  ): Promise<HoraroTickerData | null> {
    const res = await fetch(this.horaroUrl(`/schedules/${scheduleId}/ticker`), {
      headers: {
        'User-Agent': 'OengusIO Twitch Panel',
      },
    });

    if (res.status === 404) {
      return null;
    }

    const json: HoraroResponse<HoraroTickerData> = await res.json();

    return json.data;
  }
}

export const horaroApi = new HoraroApi();

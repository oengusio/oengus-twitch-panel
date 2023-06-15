import type {
  TickerData,
  HoraroTickerData,
  HoraroRun,
  TickerRun,
  RunnerInfo,
  RunnerConnection,
} from '@/types';

type ColumnIndexes = {
  gameName: number; // Game
  console: number; // Platform
  category: number; // Category
  runners: number; // Player(s)
};

function extractMarkdownLink(raw: string): { title: string; url: string } {
  // Can't re-use regex apparently
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const match = linkRegex.exec(raw);

  if (match) {
    return { title: match[1], url: match[2] };
  }

  return { title: raw, url: '' };
}

function getTwitchUsername(url: string): string {
  return url
    .replace('https://www.twitch.tv/', '')
    .replace('https://twitch.tv/', '');
}

function extractRunners(raw: string): RunnerInfo[] {
  const result: RunnerInfo[] = [];
  const runners = raw.split(/,|&|vs\./).map((it) => it.trim());

  for (const runner of runners) {
    const info = extractMarkdownLink(runner);
    const connections: RunnerConnection[] = [];

    if (
      info.url.startsWith('https://www.twitch.tv') ||
      info.url.startsWith('https://twitch.tv')
    ) {
      const username = getTwitchUsername(info.url);
      connections.push({
        id: 0,
        username,
        platform: 'TWITCH',
      });
    }

    result.push({
      id: 0,
      username: info.title,
      pronouns: null,
      connections,
    });
  }

  return result;
}

export function indexToName(index: keyof ColumnIndexes): string {
  switch (index) {
    case 'gameName':
      return 'Game';
    case 'console':
      return 'Platform';
    case 'category':
      return 'Category';
    case 'runners':
      return 'Player(s)';
  }
}

export function getColumnIndexes(data: HoraroTickerData): ColumnIndexes {
  return {
    gameName: data.schedule.columns.indexOf('Game'),
    console: data.schedule.columns.indexOf('Platform'),
    category: data.schedule.columns.indexOf('Category'),
    runners: data.schedule.columns.indexOf('Player(s)'),
  };
}

export async function parseToOengusData(
  rawData: Promise<HoraroTickerData | null> | HoraroTickerData | null
): Promise<TickerData> {
  const data = await rawData;

  if (!data) {
    return {
      current: null,
      next: null,
    };
  }

  const ticker = data.ticker;
  const indexes = getColumnIndexes(data);

  return {
    current: ticker.current
      ? horaroToOengus(ticker.current, indexes, 0)
      : ticker.previous
      ? horaroToOengus(ticker.previous, indexes, 0)
      : null,
    next: ticker.next ? horaroToOengus(ticker.next, indexes, 1) : null,
  };
}

function horaroToOengus(
  run: HoraroRun,
  indexes: ColumnIndexes,
  customId: number
): TickerRun {
  return {
    id: customId,
    gameName: extractMarkdownLink(run.data[indexes.gameName]).title,
    console: run.data[indexes.console].toString(),
    emulated: false,
    ratio: 'unknown',
    categoryName: run.data[indexes.category],
    estimate: run.length,
    setupBlock: false,
    setupTime: null,
    customRun: false,
    position: -1,
    categoryId: -1,
    type: 'Unknown',
    runners: extractRunners(run.data[indexes.runners]),
    customDataDTO: '',
    date: new Date(run.scheduled_t * 1000),
    setupBlockText: '',
  };
}

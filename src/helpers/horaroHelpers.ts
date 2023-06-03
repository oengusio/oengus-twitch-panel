import type {
  TickerData,
  HoraroTickerData,
  HoraroRun,
  TickerRun,
  RunnerInfo,
} from '@/types';

type ColumnIndexes = {
  gameName: number; // Game
  console: number; // Platform
  category: number; // Category
  runners: number; // Player(s)
};

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

function extractMarkdownLink(raw: string): { title: string; url: string } {
  const match = raw.match(linkRegex);

  console.log(match);

  if (match) {
    return { title: match[1], url: match[2] };
  }

  return { title: raw, url: '' };
}

function getTwitchUsername(url: string): string {
  return url.replace('https://twitch.tv/', '');
}

function extractRunners(raw: string): RunnerInfo[] {
  throw new Error('Method not implemented.');
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

  const indexes = getColumnIndexes(data);

  return {
    current: data.current
      ? horaroToOengus(data.current, indexes)
      : data.previous
      ? horaroToOengus(data.previous, indexes)
      : null,
    next: data.next ? horaroToOengus(data.next, indexes) : null,
  };
}

function horaroToOengus(run: HoraroRun, indexes: ColumnIndexes): TickerRun {
  return {
    id: 0,
    gameName: extractMarkdownLink(run.data[indexes.gameName]).title,
    console: run.data[indexes.console],
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
    date: new Date(run.scheduled_t),
    setupBlockText: '',
  };
}

export interface RunnerConnection {
  id: number;
  platform: string;
  username: string;
}

export interface UserInfo {
  id: number;
  username: string;
  displayName: string;
  pronouns: Array<string>;
  connections: Array<RunnerConnection>;
}

export interface LineRunner {
  runnerName?: string;
  profile?: UserInfo;
}

export interface RunInfoProp {
  next: boolean;
  runId: number;
  runInfo: Array<string>;
  date: Date;
  runners: Array<LineRunner>;
}

export interface TickerRun {
  id: number;
  game: string | null;
  console: string | null;
  emulated: boolean;
  ratio: string | null;
  category: string | null;
  estimate: string;
  setupBlock: boolean;
  setupTime: string | null;
  customRun: boolean;
  position: number;
  type: string;
  runners: Array<LineRunner>;
  setupBlockText?: string;
  date: Date;
  customData: string | null;
}

export interface TickerData {
  current: TickerRun | null;
  next: TickerRun | null;
}

export interface V2Schedule {
  id: number;
  name: string;
  slug: string;
  marathonId: string;
  published: boolean;
  lines: TickerRun[];
}

export interface Config<T = 'OENGUS'> {
  type: T;
  marathonId: string;
  marathonName: string;
  domain: string;
  oengusDomain: string;
  scheduleSlug: string;
  scheduleId: number;
}

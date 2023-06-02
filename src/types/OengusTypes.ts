export interface RunnerInfo {
  id: number;
  username: string;
  pronouns: string | null;
  connections: Array<{
    id: number;
    platform: string;
    username: string;
  }>;
}

export interface RunInfoProp {
  next: boolean;
  runId: number;
  runInfo: Array<string>;
  date: Date;
  runners: Array<RunnerInfo>;
}

export interface TickerRun {
  id: number;
  gameName: string | null;
  console: string | null;
  emulated: boolean;
  ratio: string | null;
  categoryName: string | null;
  estimate: string;
  setupBlock: boolean;
  setupTime: string | null;
  customRun: boolean;
  position: number;
  categoryId: number | null;
  type: string;
  runners: Array<RunnerInfo>;
  setupBlockText?: string;
  date: Date;
  customDataDTO: string | null;
}

export interface TickerData {
  current: TickerRun | null;
  next: TickerRun | null;
}

export interface Config<T = 'OENGUS'> {
  type: T;
  marathonId: string | null;
  marathonName: string | null;
  domain: string;
}

import type { HoraroConfig } from '@/types/HoraroTypes';
import type { Config } from '@/types/OengusTypes';

export * from './OengusTypes';
export * from './HoraroTypes';

export type configUnion = Config | HoraroConfig;

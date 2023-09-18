export declare const addHeatScale: (streakType: string, streakLength: number) => string;
export declare const addOrdinal: (number: number) => string;
export declare const createMatchupsMessage: (scoringPeriod?: number) => Promise<string>;
export declare const postMessage: (message: string) => Promise<void>;

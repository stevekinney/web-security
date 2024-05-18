/**
 * Represents a record with string keys and values of any type.
 */
export type Data = Record<string, unknown>;

/**
 * Represents the parameters and values for a SQL query.
 */
export interface ParamsAndValues {
  params: string;
  values: string;
}

/**
 * Converts an object or array of objects into a string of values.
 *
 * @param {Data | Data[]} obj - The object or array of objects to convert.
 * @returns {string} A string of values.
 */
export declare const toValues: (obj: Data | Data[]) => string;

/**
 * Converts an object or array of objects into a string of parameters for a SQL query.
 */
export declare const toParams: (obj: Data | Data[]) => string;

/**
 * Converts an object or array of objects into a string of parameters and values for a SQL query.
 */
export declare function toParamsAndValues(obj: Data): string;
export declare function toParamsAndValues(
  obj: Data[],
  withID: boolean
): ParamsAndValues;

/**
 * A collection of database functions with SQLite.
 */
export declare const db: import('sqlite').Database & {
  all: import('sqlite').Database['all'];
  get: import('sqlite').Database['get'];
  exec: (sql: string) => Promise<void>;
  run: import('sqlite').Database['run'];
};

export {};

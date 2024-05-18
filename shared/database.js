import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import chalk from 'chalk';

/**
 * @typedef {Object.<string, unknown>} Data
 */

/**
 * @typedef {Object} ParamsAndValues
 * @property {string} params
 * @property {string} values
 */

const database = await open({
  filename: './database.sqlite',
  driver: sqlite3.Database,
});

const showSQL = process.env.SHOW_SQL === 'true';

/**
 * Logs the SQL query and parameters to the console.
 * @param {import('sqlite').ISqlite.SqlType | string} sql — The SQL query.
 * @param {unknown[]} params — The parameters for the SQL query.
 * @returns {void}
 */
const log = (sql, params = []) => {
  if (!showSQL) return;
  console.log(
    '📀',
    chalk.bgBlue('SQL'),
    chalk.blue(sql),
    ...params.map((param) => chalk.yellow(param))
  );
};

/**
 * Gets all rows from the database that match the SQL query.
 * @type {import('sqlite').Database['all']}
 */
const all = (sql, params) => {
  log(sql, params);
  return database.all(sql, params);
};

/**
 * Gets the first row from the database that matches the SQL query.
 * @type {import('sqlite').Database['get']}
 */
const get = (sql, params) => {
  log(sql, params);
  return database.get(sql, params);
};

/**
 * Executes the SQL query on the database.
 * @type {import('sqlite').Database['exec']}
 */
const exec = (sql) => database.exec(sql);

/**
 * Runs the SQL query on the database.
 * @type {import('sqlite').Database['run']}
 */
const run = (sql, params) => {
  log(sql, params);
  return database.run(sql, params);
};

/**
 * Converts an object or array of objects into a string of values.
 *
 * @param {Data | Data[]} obj - The object or array of objects to convert.
 * @returns {string} A string of values.
 */
export const toValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toValues).join(', ');
  }

  const values = Object.values(obj)
    .map((value) => (typeof value === 'string' ? `'${value}'` : value))
    .join(', ');

  return `(${values})`;
};

/**
 * Converts an object or array of objects into a string of parameters for a SQL query.
 *
 * @param {Data | Data[]} obj - The object or array of objects to convert.
 * @returns {string} A string of parameters.
 */
export const toParams = (obj) => {
  if (Array.isArray(obj)) {
    obj = obj[0];
  }

  const params = Object.keys(obj).join(', ');

  return `(${params})`;
};

/**
 * Converts an object or array of objects into a string of parameters and values for a SQL query.
 *
 * @param {Data[] | Data} obj - The array of objects to convert.
 * @param {boolean | undefined} withID - Whether to include an ID field in the result.
 * @returns {ParamsAndValues | string} An object containing the parameters and values.
 */
export const toParamsAndValues = (obj, withID) => {
  if (Array.isArray(obj)) {
    if (withID === undefined) withID = false;
    if (withID) {
      obj = obj.map((o, i) => ({ id: i + 1, ...o }));
    }

    return {
      params: toParams(obj),
      values: toValues(obj),
    };
  }

  return Object.entries(obj)
    .map(([key, value]) => `${key} = ${formatValue(value)}`)
    .join(', ');
};

/**
 * Formats a value for a SQL query.
 * @param {unknown} value - The value to format.
 * @returns {string} The formatted value.
 */
const formatValue = (value) => {
  return typeof value === 'string' ? `'${value}'` : String(value);
};

/**
 * A collection of database functions with SQLite
 */
export const db = {
  ...database,
  all,
  get,
  exec,
  run,
};

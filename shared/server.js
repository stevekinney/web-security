import chalk from 'chalk';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { vite as v } from './vite.js';

import { db } from './database.js';
import { logRequests } from './middleware.js';
import { generateHtml } from './meta.js';
import { handlebars } from './handlebars.js';

/**
 * The port on which the server should listen.
 * @type {string | number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Creates an Express application with the necessary middleware for our examples.
 * @param {object} [options={}] - The options object.
 * @param {boolean} [options.cookies=true] - Whether to enable cookie parsing.
 * @param {string} [options.secret='super-secret'] - The secret used to sign cookies.
 * @param {'ejs' | 'handlebars'} [options.viewEngine='ejs'] - The view engine to use.
 * @param {boolean}  [options.vite=true] - Enable Vite middleware.
 * @param {boolean} [options.log=true] - Whether to log requests to the console.
 * @returns {import('express').Application}
 */
export const createServer = ({
  log = true,
  cookies = true,
  secret = 'super-secret',
  viewEngine = 'ejs',
  vite = true,
} = {}) => {
  const app = express();

  if (viewEngine === 'handlebars') {
    app.engine('handlebars', handlebars.engine);
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (cookies) {
    app.use(cookieParser(secret));
  }

  if (log) {
    app.use(logRequests);
  }

  if (vite) {
    app.use(v.middlewares);
  }

  app.set('view engine', viewEngine);
  app.set('views', './views');
  app.use('/', express.static(join(process.cwd(), '/public')));

  return app;
};

/**
 * Starts the server with the given Express application and configuration options.
 *
 * @param {import('express').Application} app - The Express application.
 * @param {{ name?: string, port?: string | number }} [options={}] - The configuration options.
 * @param {object} options - The options object.
 * @param {string} [options.name='Server'] - The name of the server.
 * @param {string | number} [options.port='4444'] - The port on which the server should listen.
 */
export const startServer = (app, { name = 'Server', port = PORT } = {}) => {
  app.get('/__meta__', async (_, res) => {
    /** @type{ Partial<{name: string, sql: string}>[]} */
    let tables = await db.all('SELECT * FROM sqlite_master');

    tables = tables.filter(({ name }) => !name?.startsWith('sqlite'));

    tables = await Promise.all(
      tables.map(async (table) => {
        const columns = await db.all(`PRAGMA table_info(${table.name})`);
        const data = await db.all(`SELECT * FROM ${table.name}`);
        return { ...table, columns, data };
      })
    );

    // @ts-ignore
    res.send(generateHtml(tables));
  });

  app.listen(port, () => {
    const address = chalk.magenta(`http://localhost:${port}`);
    console.log(`🍦 ${chalk.bgYellow.black(name)} Listening on ${address}.`);
  });
};

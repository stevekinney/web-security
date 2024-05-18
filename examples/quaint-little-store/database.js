import { db, toParamsAndValues } from '#shared/database.js';
import crypto from 'crypto';

import { users, products } from './data/index.js';

const { params: userParams, values: userValues } = toParamsAndValues(
  users,
  true
);

const { params: productParams, values: productValues } = toParamsAndValues(
  products,
  true
);

await db.exec(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, admin BOOLEAN, creditCard TEXT, cvv TEXT, expirationDate TEXT)'
);

await db.exec(
  'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, category TEXT, price INTEGER, quantity INTEGER, image TEXT)'
);

await db.run(
  'CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY, userId INTEGER)'
);

await db.exec(
  `INSERT OR IGNORE INTO products ${productParams} VALUES ${productValues}`
);

await db.exec(`INSERT OR IGNORE INTO users ${userParams} VALUES ${userValues}`);

await db.run(
  `INSERT OR IGNORE INTO sessions (sessionId, userId) VALUES ('${crypto
    .randomBytes(16)
    .toString('hex')}', 2)`
);

export { db };

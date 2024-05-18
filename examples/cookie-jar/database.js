import { db } from '#shared/database.js';

import { toValues } from '#shared';

const users = toValues([
  { username: 'bobbytables', password: 'papayawhip' },
  { username: 'admin', password: 'blanchedalmond' },
]);

await db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'
);

await db.run(
  'CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, username TEXT)'
);

const { count } = await db.get('SELECT COUNT(*) as count FROM users');

if (!count) {
  console.log('Seeding users...');
  await db.run(`INSERT INTO users (username, password) VALUES ${users}`);
}

export default db;

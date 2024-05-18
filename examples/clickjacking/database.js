import { db } from '#shared/database.js';

await db.exec(
  'CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, secret TEXT)'
);

await db.exec(
  'INSERT OR IGNORE INTO data (id, secret) VALUES (1, "This is a secret value")'
);

export async function getSecret() {
  const result = await db.get('SELECT secret FROM data WHERE id = 1');
  return result.secret;
}

export default db;

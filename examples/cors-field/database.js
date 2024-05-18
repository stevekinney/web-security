import { db } from '#shared/database.js';

await db.exec(
  'CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, value TEXT)'
);

await db.run('INSERT OR IGNORE INTO data (id, value) VALUES (?, ?)', [
  1,
  'Umm… this should not be here.',
]);

export { db };

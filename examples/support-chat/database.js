import { db } from '#shared/database.js';

await db.run(
  'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)'
);

await db.run('INSERT OR IGNORE INTO messages (content) VALUES (?)', [
  'Hello, world!',
]);

export default db;

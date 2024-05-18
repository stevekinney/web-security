import { db } from '#shared/database.js';

await db.exec(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
)`);

export default db;

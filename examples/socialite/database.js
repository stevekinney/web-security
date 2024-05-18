import { db } from '#shared/database.js';

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} photograph
 * @property {string} biography
 * @property {boolean} administrator
 * @property {boolean} suspended
 * @property {string} createdAt
 * @property {string} updatedAt
 */

await db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        salt TEXT,
        photograph TEXT,
        biography TEXT,
        administrator BOOLEAN DEFAULT 0,
        suspended BOOLEAN DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

await db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        content TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);

export { db };

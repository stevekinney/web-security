import { toParamsAndValues } from '#shared';
import { db } from '../database.js';

/**
 * @typedef {import('../database.js')} User
 */

/**
 * @param {string} username
 * @returns {Promise<boolean>}
 */
export const userExists = async (username) => {
  const user = await db.get('SELECT * FROM users WHERE username = ?', [
    username,
  ]);
  return !!user;
};

/**
 * A possibly _too_ clever of a way to update a user record.
 * This function will update the user record in the database and then
 * fetch the updated record to set on the request object.
 *
 * @param {number | string} id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateUser = async (id, req, res) => {
  const params = toParamsAndValues(req.body);

  await db.run(`UPDATE users SET ${params} WHERE id = ?`, [id]);
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);

  if (user) {
    req.user = user;
    res.locals.user = req.user;
  }
};

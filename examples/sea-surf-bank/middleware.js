import { db } from './database.js';

/**
 * Get the current user from the session.
 * @type import('express').RequestHandler
 */
export const currentUser = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    res.locals.user = null;
    return next();
  }

  const user = await db.get(
    'SELECT * FROM users JOIN sessions ON users.id = sessions.userId WHERE sessionId = ?',
    sessionId
  );

  res.locals.user = user;

  next();
};

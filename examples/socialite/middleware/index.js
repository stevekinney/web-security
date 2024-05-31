import { db } from '../database.js';
import { getSession } from '../index.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const currentUser = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  /**
   * @type {{ sessionId: string, userId: string, token: string  }}
   */
  const session = await getSession(sessionId);
  console.log('Session:', session);

  if (!session) {
    return next();
  }

  /**
   * @type {import('../database.js').User | undefined}
   */
  const user = await db.get('SELECT * FROM users WHERE id = ?', [
    session.userId,
  ]);

  if (user) {
    req.user = user;
    res.locals.user = user;
    res.locals.token = session.token;

    console.log('User:', user.username);
  }

  next();
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const authenticate = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .redirect(
        `/login?redirect=${req.originalUrl}&error=You must be logged in to view that page.`
      );
  }

  next();
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const isAdministrator = (req, res, next) => {
  if (!req.user?.administrator) {
    return res.status(403).send({ error: 'Administrative access required.' });
  }

  next();
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const isSuspended = (req, res, next) => {
  if (req.user?.suspended) {
    return res.status(403).send({ error: 'User is suspended.' });
  }

  next();
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const methodOverride = (req, res, next) => {
  const method =
    req.body._method ||
    req.query._method ||
    req.headers['x-http-method-override'];

  if (method) {
    req.method = method.toUpperCase();
  }

  delete req.body?._method;
  delete req.query?._method;

  next();
};

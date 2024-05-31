import { startServer, createServer } from '#shared';
import { v4 as uuid } from 'uuid';

import { db } from './database.js';

import {
  authenticate,
  currentUser,
  isAdministrator,
  methodOverride,
} from './middleware/index.js';

import { userExists, updateUser } from './utilities/index.js';

const app = createServer({ viewEngine: 'handlebars' });

app.use(currentUser);
app.use(methodOverride);

/**
 * @param {string} userId
 */
export const createSession = (userId) => {
  const sessionId = uuid();
  const token = uuid();

  db.run('INSERT INTO sessions (sessionId, userId, token) VALUES (?, ?, ?)', [
    sessionId,
    userId,
    token,
  ]);

  return sessionId;
};

/**
 * @param {string} sessionId
 */
export const getSession = (sessionId) => {
  return db.get('SELECT * FROM sessions WHERE sessionId = ?', [sessionId]);
};

app.get('/', async (req, res) => {
  const limit = req.query.limit || 50;

  const posts = await db.all(
    'SELECT posts.*, users.username, users.photograph AS avatar FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.createdAt DESC LIMIT ?',
    [limit]
  );

  res.render('posts', { title: 'Home', posts });
});

app.get('/login', async (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/signup', async (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

app.get('/profile', authenticate, async (req, res) => {
  res.render('profile', { title: 'Profile' });
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  if (!user) {
    return res
      .status(400)
      .render('login', { error: 'Invalid login credentials.' });
  }

  const sessionId = createSession(user.id);
  res.cookie('sessionId', sessionId);

  res.redirect('/');
});

// User logout
app.post('/logout', authenticate, (req, res) => {
  res.clearCookie('sessionId');
  res.redirect('/');
});

// User signup
app.post('/account', async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res
      .status(400)
      .render('signup', { title: 'Sign Up', error: 'Passwords do not match.' });
  }

  try {
    const { lastID } = await db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );

    const user = await db.get('SELECT id FROM users WHERE id = ?', [lastID]);

    const sessionId = createSession(user.id);
    res.cookie('sessionId', sessionId);

    res.redirect('/');
  } catch (error) {
    console.error(error);

    if (await userExists(username)) {
      return res
        .status(400)
        .render('signup', { error: 'Username already exists.' });
    }

    res.status(500).render('signup', { error: 'Unable to create user.' });
  }
});

app.patch('/account', authenticate, async (req, res) => {
  try {
    await updateUser(req.user.id, req, res);
    res.render('profile', { title: 'Profile', message: 'Profile updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).render('profile', {
      title: 'Profile',
      error: 'Unable to update profile.',
    });
  }
});

// Delete account
app.delete('/account', authenticate, async (req, res) => {
  try {
    await db.run('DELETE FROM users WHERE id = ?', [req.user.id]);

    res.clearCookie('sessionId');
    res.send({ message: 'Account deleted successfully.' });
  } catch (error) {
    res.status(500).render('profile', { error: 'Unable to delete account.' });
  }
});

// Get posts
app.get('/posts', async (req, res) => {
  const limit = req.query.limit || 50;

  const posts = await db.all(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.createdAt DESC LIMIT ?',
    [limit]
  );

  res.send({ posts });
});

// Create post
app.post('/posts', authenticate, async (req, res) => {
  const { content, _csrf } = req.body;

  if (_csrf !== res.locals.token) {
    return res.status(403).send({ error: 'Unauthorized.' });
  }

  const { lastID } = await db.run(
    'INSERT INTO posts (userId, content) VALUES (?, ?)',
    [req.user.id, content]
  );

  const post = await db.get('SELECT * FROM posts WHERE id = ?', [lastID]);

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    return res.redirect('/');
  }

  res.send({ post });
});

// Delete post
app.delete('/posts/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);

  if (!post) return res.status(404).send({ error: 'Post not found.' });

  if (post.userId !== req.user.id && !req.user.administrator) {
    return res.status(403).send({ error: 'Unauthorized to delete post.' });
  }

  try {
    await db.run('DELETE FROM posts WHERE id = ?', [id]);
    res.send({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error.' });
  }
});

app.get('/users', authenticate, isAdministrator, async (req, res) => {
  const users = await db.all('SELECT * FROM users');

  res.send({ users });
});

app.get('/users/:id', authenticate, isAdministrator, async (req, res) => {
  const { id } = req.params;
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);

  if (!user) return res.status(404).send({ error: 'User not found.' });

  res.send({ user });
});

app.patch('/users/:id', authenticate, isAdministrator, async (req, res) => {
  const { id } = req.params;

  try {
    await updateUser(id, req.body, res);
    res.send({ message: 'User updated successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error.' });
  }
});

app.get('/update-status', authenticate, async (req, res) => {
  const content = req.query.content;

  await db.run('INSERT INTO posts (userId, content) VALUES (?, ?)', [
    req.user.id,
    content,
  ]);

  res.sendStatus(204);
});

startServer(app);

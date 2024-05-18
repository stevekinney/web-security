import crypto from 'crypto';
import { startServer, createServer } from '#shared';
import { db } from './database.js';
import { currentUser } from './middleware.js';

const app = createServer();

app.use(currentUser);

app.get('/', (req, res) => {
  if (res.locals.user) return res.redirect('/account');
  res.redirect('/login');
});

app.get('/account', async (req, res) => {
  const user = res.locals.user;
  const message = req.query.message;

  if (!user) {
    return res.redirect('/login?error=Please log in first.');
  }

  const friends = await db.all(
    'SELECT id, username FROM users WHERE id != ?',
    user.id
  );

  res.render('account', { title: 'Sea Surf Bank', friends, message });
});

app.get('/login', (req, res) => {
  if (res.locals.user) return res.redirect('/account');
  const error = req.query.error;
  res.render('login', { title: 'Login', error });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  if (!user) {
    return res.redirect('/login?error=Invalid username or password');
  }

  const sessionId = crypto.randomBytes(16).toString('hex');

  try {
    await db.run(`INSERT INTO sessions (sessionId, userId) VALUES (?, ?)`, [
      sessionId,
      user.id,
    ]);

    res.cookie('sessionId', sessionId);
    res.redirect('/account');
  } catch (error) {
    console.error(error);
    return res.redirect(
      '/login?error=Error creating session. Please try again.'
    );
  }
});

app.get('/transfer', (_, res) => {
  res.render('transfer', { title: 'Transfer' });
});

app.post('/transfer', async (req, res) => {
  const { user } = res.locals;
  const { amount, recipient } = req.body;

  try {
    await db.run('UPDATE users SET balance = balance - ? WHERE id = ?', [
      amount,
      user.id,
    ]);

    await db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [
      amount,
      recipient,
    ]);

    if (req.headers['referer']?.includes('/account')) {
      return res.redirect(`/account?message=Transfer successful!`);
    }

    console.log(`Transferred $${amount} from ${user.username}.`);
    res.sendStatus(202);
  } catch (err) {
    return res.status(500).send('Error updating balance');
  }
});

app.post('/logout', async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.redirect('/login');
  }

  await db.run('DELETE FROM sessions WHERE sessionId = ?', sessionId);

  res.clearCookie('sessionId');
  res.redirect('/login');
});

app.get('/evil', async (req, res) => {
  res.render('malicious', { title: 'Malicious', port: process.env.PORT });
});

startServer(app, { name: 'Sea Surf' });

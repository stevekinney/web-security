import { startServer, createServer, toParamsAndValues } from '#shared';
import crypto from 'crypto';

import { db } from './database.js';
import { api } from './api.js';

const app = createServer();

app.set('view engine', 'ejs');

/**
 * This middleware sets the user, title, message, and error properties on the response locals object.
 * Does it do a bit too much? Maybe. But, it's a good example of how middleware can be used to
 * set up common properties for all routes.
 */
app.use(async (req, res, next) => {
  res.locals.user = null;

  res.locals.title = 'A Quaint Little Store';
  res.locals.message = req.query.message;
  res.locals.error = req.query.error;

  const session = req.cookies.session;

  if (session) {
    res.locals.user = await db.get(
      `SELECT * FROM users INNER JOIN sessions ON users.id = sessions.userId WHERE sessions.sessionId = '${session}'`
    );
  }

  next();
});

app.use('/api', api);

app.get('/', (req, res) => {
  if (req.query.error) res.status(403);
  res.render('home', { error: req.query?.error });
});

app.get('/privacy', (_, res) => {
  res.render('privacy', { title: 'Privacy Policy' });
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await db.get(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
  );

  if (user) {
    const sessionId = crypto.randomBytes(16).toString('hex');

    await db.exec(
      `INSERT INTO sessions (sessionId, userId) VALUES ('${sessionId}', ${user.id})`
    );

    res.cookie('session', sessionId, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    return res.redirect('/');
  } else {
    return res.redirect('/?error=Invalid email or password');
  }
});

app.post('/logout', async (req, res) => {
  await db.run(
    `DELETE FROM sessions WHERE sessionId = '${req.cookies.session}'`
  );

  res.clearCookie('session');
  res.redirect('/');
});

app.get('/products', async (req, res) => {
  const search = req.query.search || '';
  const limit = req.query.limit || 10;

  const products = await db.all(
    `SELECT * FROM products WHERE name LIKE '${search}%' LIMIT ${limit}`
  );

  res.render('products', {
    title: 'Products',
    products,
    search,
  });
});

app.get('/products/:id', async (req, res) => {
  const product = await db.get(
    `SELECT * FROM products WHERE id = ${req.params.id}`
  );

  if (!product) {
    res.status(404).send('Product not found');
    return;
  }

  res.render('product', { product, title: product.name });
});

app.patch('/products/:id', async (req, res) => {
  if (!res.locals.user?.admin) return res.status(403).send('Forbidden');

  const fields = toParamsAndValues(req.body);
  const sql = `UPDATE products SET ${fields} WHERE id = ${req.params.id}`;

  try {
    await db.run(sql);
    res.sendStatus(204);
  } catch (error) {
    res.send(500).send({ error: /** @type {Error} */ (error).message });
  }
});

app.get('/profile', async (req, res) => {
  if (!res.locals.user) {
    return res.redirect('/?error=You must be logged in');
  }

  res.render('profile', { title: 'Profile' });
});

app.patch('/profile', async (req, res) => {
  if (!res.locals.user) return res.status(403).send({ error: 'Forbidden' });

  const fields = toParamsAndValues(req.body);
  const sql = `UPDATE users SET ${fields} WHERE id = ${res.locals.user.id}`;

  try {
    await db.run(sql);
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

startServer(app);

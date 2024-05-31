import { Router } from 'express';
import { db } from './database.js';

const api = Router();

api.get('/profile', async (req, res) => {
  const user = res.locals.user;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  return res.json({ user });
});

api.get('/products', async (req, res) => {
  const search = req.query.search || '';
  const limit = req.query.limit || 10;

  try {
    const products = await db.all(
      `SELECT * FROM products WHERE name LIKE '${search}%' LIMIT ${limit}`
    );
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: /** @type {Error} */ (error).message });
  }
});

api.get('/products/:id', async (req, res) => {
  const product = await db.get(
    `SELECT * FROM products WHERE id = ${req.params.id}`
  );

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  res.json({ product });
});

api.get('/users', async (req, res) => {
  const search = req.query.search || '';
  const sql = `SELECT name FROM users WHERE name LIKE '${search}%'`;

  try {
    const users = await db.all(sql);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: /** @type {Error} */ (error).message });
  }
});

export { api };

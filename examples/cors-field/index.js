import { createServer, startServer } from '#shared';

import { db } from './database.js';

const app = createServer({
  log: true,
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Cross Origin Resource Sharing' });
});

app.get('/data', async (req, res) => {
  const rows = await db.all('SELECT * FROM data');
  res.json(rows);
});

app.post('/data', async (req, res) => {
  const { value } = req.body;

  const result = await db.run('INSERT INTO data (value) VALUES (?)', [value]);
  res.json({ id: result.lastID });
});

app.all('/echo', (req, res) => {
  res.json(req.body);
});

startServer(app, { name: 'CORS' });

import { startServer, createServer } from '#shared';

const app = createServer();

app.get('/', (req, res) => {
  res.render('attacker');
});

startServer(app, { name: 'Clickjacking Attacker' });

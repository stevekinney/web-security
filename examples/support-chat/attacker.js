import { startServer, createServer } from '#shared';

const app = createServer();

app.get('/', (req, res) => {
  res.render('attacker');
});

app.get('/chat', (req, res) => {
  res.render('attacker-chat');
});

app.get('/steal', (req, res) => {
  const { data } = req.query;
  console.log('Stolen data:', data);
  res.sendStatus(200);
});

app.get('/innocuous', (req, res) => {
  res.render('innocuous');
});

startServer(app, { name: 'postMessage Attacker' });

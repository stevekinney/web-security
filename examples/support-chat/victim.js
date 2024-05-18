import { startServer, createServer } from '#shared';

const app = createServer();

app.get('/', (req, res) => {
  res.cookie('secret-data', '1234');

  res.render('victim');
});

startServer(app, { name: 'postMessage Victim' });

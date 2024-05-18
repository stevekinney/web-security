import { createServer, startServer } from '#shared';

const app = createServer();

startServer(app, { name: 'The Void' });

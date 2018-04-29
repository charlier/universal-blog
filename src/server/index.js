import cluster from 'cluster';
import express from 'express';
import os from 'os';

import App from './app';

if (cluster.isMaster) {
  const cpus = os.cpus();
  cpus.forEach(() => cluster.fork());
  cluster.on('exit', () => cluster.fork());
} else {
  const server = express();
  server.use(express.static('./dist/client'));
  const port = process.env.PORT || 3000;
  server.listen(port);
  server.get('*', App);
}

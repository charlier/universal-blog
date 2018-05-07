import cluster from 'cluster';
import express from 'express';
import os from 'os';
import morgan from 'morgan';
import cors from 'cors';

import App from './app';

if (cluster.isMaster) {
  const cpus = os.cpus();
  cpus.forEach(() => cluster.fork());
  cluster.on('exit', () => cluster.fork());
} else {
  const server = express();
  server.disable('x-powered-by');
  const logLevel = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  server.use(morgan(logLevel));
  server.use(express.static('./dist/client'));
  server.use(cors({
    exposedHeaders: ['Link']
  }));
  const port = process.env.PORT || 3000;
  server.listen(port);
  server.use('/api', App);
}

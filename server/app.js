import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import logger from './lib/logger.js';
import apiRouter from './apiRouter.js';
import clientRouter from './clientRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();

export default () => {
  app.use(morgan('combined', { stream: logger.stream }));

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'pug');
  app.use(compression());
  app.use('/api', apiRouter);
  app.use('', clientRouter);

  return app;
};
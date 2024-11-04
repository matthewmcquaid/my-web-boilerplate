import express from 'express';
import client from './routes/client/index.js';

const clientRouter = express.Router();

clientRouter.use(express.static(client.staticDir));
clientRouter.get('*', client.index);

export default clientRouter;
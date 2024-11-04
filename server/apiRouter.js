import { Router } from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import validateRequest from './middleware/authorizeMiddleware.js';

const apiRouter = Router();

apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.get('/', routes.getAppIndex);
apiRouter.get('/version', validateRequest, routes.getApiVersion);

export default apiRouter;
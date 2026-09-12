import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import routerv1 from './routes/v1/router';
import { logHttpRequests } from './shared/logger/morgan-logger';
import errorHandler from './shared/middlewares/error-handler.middleware';
import { serverAdapter } from './shared/queue/queue-board';
import helmet from 'helmet';
import routerv2 from './routes/v2/router';

const app = express();

app
  .use(cors())
  .use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  )
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    helmet.frameguard({
      action: 'deny',
    })
  )
  .use('/static', express.static(path.join(process.cwd() + '/mx-images/')))
  .use(logHttpRequests);

//init all the modules
//for fun fantacy
app.use('/api/v1', routerv1);

//for dreamer
app.use('/api/v2', routerv2);


// app.use('/admin/queues', serverAdapter.getRouter());
//
app.use(errorHandler);

export default app;

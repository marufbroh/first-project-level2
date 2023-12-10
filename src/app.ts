/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;

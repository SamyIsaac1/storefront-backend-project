import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to Storefront API!');
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

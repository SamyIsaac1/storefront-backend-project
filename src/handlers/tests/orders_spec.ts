import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

dotenv.config();

const request = supertest(app);

const productStore = new ProductStore();
// Creating a token
const user: User = {
  firstname: 'samy',
  lastname: 'isaac',
  username: 'SamyIsaac',
  password: 'password123',
};
// creating a token
let token: string;

describe('Order Handler', () => {
  beforeAll(async () => {
    const product: Product = {
      name: 'Shirt',
      price: 10,
    };

    const res = await request.post('/users/create').send(user);
    if (res.status == 200) {
      token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    }
    await productStore.create(product);
  });

  it('should CREATE an order', async () => {
    const response = await request
      .post('/orders')
      .auth(token, { type: 'bearer' })
      .send({ status: 'active', user_id: '1' });

    expect(response.status).toBe(200);
  });

  it('should GET all orders', async () => {
    const response = await request
      .get('/orders')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('should GET orders by user id', async () => {
    const response = await request
      .get('/orders/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('should CREATE order with product quantity and product id', async () => {
    const response = await request
      .post('/orders/1/products/')
      .auth(token, { type: 'bearer' })
      .send({ quantity: 1, productId: 1 });

    expect(response.status).toBe(200);
  });

  it('should DELETE order by order id', async () => {
    const response = await request
      .delete('/orders/2')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });
});

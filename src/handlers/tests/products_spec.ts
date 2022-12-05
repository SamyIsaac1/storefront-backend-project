import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/product';
import { User } from '../../models/user';

dotenv.config();

// Creating a token
const user: User = {
  firstname: 'samy',
  lastname: 'isaac',
  username: 'SamyIsaac',
  password: 'password123',
};
// creating a token
let token: string;

const request = supertest(app);

const productRecord: Product = {
  name: 'Shirt',
  price: 10,
};

describe('Product Model', () => {
  it('CREATE a product endpoint ', async () => {
    const res = await request.post('/users/create').send(user);
    if (res.status == 200) {
      token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    }
    // resource https://www.npmjs.com/package/supertest
    const response = await request
      .post('/products')
      .auth(token, { type: 'bearer' })
      .send(productRecord);

    expect(response.status).toBe(200);
  });

  it('GET all products ', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('GET a products by id', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('DELETE a product by id ', async () => {
    // we are going to delete the record we have created before
    const response = await request
      .delete('/products')
      .auth(token, { type: 'bearer' })
      .send({ id: 3 });
    expect(response.status).toBe(200);
  });
});

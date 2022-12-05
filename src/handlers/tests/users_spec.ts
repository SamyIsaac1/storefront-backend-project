import supertest from 'supertest';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../../server';
import { User } from '../../models/user';

dotenv.config();

const request = supertest(app);
const user: User = {
  firstname: 'samy',
  lastname: 'isaac',
  username: 'SamyIsaac',
  password: 'password123',
};
// creating a token
let token: string;
describe('User Model', () => {
  it('CREATE a user endpoint ', async () => {
    const response = await request.post('/users/create').send(user);
    if (response.status == 200) {
      token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    }
    expect(response.status).toBe(200);
  });

  it('GET all users ', async () => {
    const response = await request
      .get('/users')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('GET a user by id', async () => {
    const response = await request
      .get('/users/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('LOGIN a user by id', async () => {
    const response = await request.post('/users/login').send(user);
    if (response.status == 200) {
      token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    }
    expect(response.status).toBe(200);
  });

  it('DELETE a user by id ', async () => {
    // we are going to delete the record we have created before
    const response = await request
      .delete('/users')
      .auth(token, { type: 'bearer' })
      .send({ id: 2 });

    expect(response.status).toBe(200);
  });
});

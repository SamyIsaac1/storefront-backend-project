import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middlewares/verifyAuthToken';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id as unknown as number);
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname as unknown as string,
    lastname: req.body.lastname as unknown as string,
    username: req.body.username as unknown as string,
    password: req.body.password as unknown as string,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string
    );
    res.send(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id as unknown as number);
  res.json(deleted);
};

const login = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname as unknown as string,
    lastname: req.body.lastname as unknown as string,
    username: req.body.username as unknown as string,
    password: req.body.password as unknown as string,
  };
  try {
    const u = await store.login(user.firstname, user.lastname, user.password);
    res.send(u);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/users/create', create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users/login', login);
  app.delete('/users', verifyAuthToken, destroy);
};
export default userRoutes;

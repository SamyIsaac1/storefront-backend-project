import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id as unknown as number);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status as string,
      user_id: req.body.user_id as string,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.deleteOrder(req.params.id as unknown as number);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: number = _req.params.id as unknown as number;
  const productId: number = _req.body.productId as unknown as number;
  const quantity: number = _req.body.quantity as unknown as number;

  try {
    const addedProduct = await store.addOrderProduct(
      quantity,
      orderId,
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteProduct = async (_req: Request, res: Response) => {
  const orderId: number = _req.params.id as unknown as number;
  const productId: number = _req.body.productId as unknown as number;

  try {
    const addedProduct = await store.deleteOrderProduct(orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  // add product
  app.post('/orders/:id/products/', verifyAuthToken, addProduct);
  // delete product
  app.delete('/orders/:id/products/', verifyAuthToken, deleteProduct);
};

export default orderRoutes;

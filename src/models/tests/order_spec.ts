import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';
import { Product, ProductStore } from '../product';
import dotenv from 'dotenv';

dotenv.config();
const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

const orderRecord: Order = {
  status: 'active',
  user_id: '1',
};

const userRecord: User = {
  firstname: 'samy',
  lastname: 'isaac',
  username: 'SamyIsaac',
  password: 'password123',
};

const productRecord: Product = {
  name: 'Shirt',
  price: 10,
};

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a deleteOrder method', () => {
    expect(store.deleteOrder).toBeDefined();
  });

  it('should have a addOrderProduct method', () => {
    expect(store.addOrderProduct).toBeDefined();
  });

  it('should have a deleteOrderProduct method', () => {
    expect(store.deleteOrderProduct).toBeDefined();
  });
  beforeAll(async () => {
    await userStore.create(userRecord);
    await productStore.create(productRecord);
    await store.create(orderRecord);
  });

  it('CREATE method should add an order', async () => {
    // make sure the order has been created
    const orders = await store.index();
    const { status, user_id } = orders[0];

    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: '1',
    });
  });

  it('INDEX method should return all orders', async () => {
    const orders = await store.index();
    const { status, user_id } = orders[0];

    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: '1',
    });
  });

  it('SHOW method should return the orders of a user', async () => {
    const { status, user_id } = await store.show(1);

    expect({ status, user_id }).toEqual({
      status: 'active',
      user_id: '1',
    });
  });

  it('CREATE an OrderProduct', async () => {
    // @ts-ignore
    const { quantity, order_id, product_id } = await store.addOrderProduct(
      4,
      1,
      1
    );

    expect({ quantity, order_id, product_id }).toEqual({
      quantity: 4,
      order_id: '1',
      product_id: '1',
    });
  });

  it('DELETE an orderProduct from orderProduct table by orderId and productId', async () => {
    await store.create(orderRecord);
    await store.addOrderProduct(4, 2, 2);
    const result = await store.deleteOrderProduct(2, 2);
    // @ts-ignore
    expect(result).toBe(undefined);
  });
});

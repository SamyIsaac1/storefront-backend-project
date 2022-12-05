// @ts-ignore
import Client from '../database';

export type Order = {
  id?: Number;
  status: String;
  user_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(userId: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addOrderProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const orderProduct = result.rows[0];
      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async deleteOrderProduct(orderId: number, productId: number): Promise<null> {
    try {
      const sql =
        'DELETE FROM  order_products WHERE  order_id=($1) AND  product_id=($2)';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId, productId]);

      const orderProduct = result.rows[0];

      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not delete product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}

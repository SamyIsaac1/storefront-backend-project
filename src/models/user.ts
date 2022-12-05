// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
const pepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      //@ts-ignoreX$
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable delete user (${id}): ${err}`);
    }
  }

  async login(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';

    const result = await conn.query(sql, [firstname, lastname]);

    if (result.rows.length) {
      const user = result.rows[0];
      // Checking the password
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}

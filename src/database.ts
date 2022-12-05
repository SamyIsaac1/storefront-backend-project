import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  ENV,
} = process.env;

export const client: Pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string),
  database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
});

export default client;

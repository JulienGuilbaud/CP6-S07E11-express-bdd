import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client();
client.connect();

export default client;
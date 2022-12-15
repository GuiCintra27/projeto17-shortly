import pg from 'pg';

const { Pool } = pg;

const connectionDB = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'shortly'
})

export default connectionDB;
import pg from 'pg';

const { Pool } = pg;

const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: 'dpg-ceeepo02i3mpv5pv3bo0-a',
    port: 5432,
    user: 'guicintra',
    password: 'BNwjJTspbQy1I5hFBZV10FLRX7ITTeHu',
    database: 'shortly_cjt7',
    ssl: true
})

export default connectionDB;
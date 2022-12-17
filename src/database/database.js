import pg from 'pg';

const { Pool } = pg;

const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: 'dpg-ceeh1ih4reb2f7rnr5ag-a',
    port: 5432,
    user: 'guicintra',
    password: 'ODOod59L6xWNOiMo2X1JmYIt48AWXZUH',
    database: 'shortly_gu1j'
})

export default connectionDB;
const alpha = 45;



const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'lanang95',
    host: 'localhost',
    port: 3004,
    database: 'perntodo'
});
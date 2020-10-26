// for make permision to use sql query in js
const Pool = require('pg').Pool;

// configure where we want to connect
const pool = new Pool({
    user: 'postgres',
    password: 'lanang95',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;
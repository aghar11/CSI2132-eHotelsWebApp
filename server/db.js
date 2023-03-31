/**
 * Define databse connection.
 *
 * @author Eric Van De Lande.
 * @since  March, 2023
 */

// Setup
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Arsenal14",
    host: "localhost",
    port: 5432,
    database: "postgres"
});

module.exports = pool;
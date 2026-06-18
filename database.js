// Imports --------------------------------
import mysql from 'mysql2/promise';

// Database configuration -----------------
const dbConfig = {
    database: 'unibasedatabase', //this is the db that we imported in the first vid
    port: 3306, //port from the XAMPP
    host: 'localhost', //running in our local machine
    user: 'root',
    password: '',
    namedPlaceholders: true,
};

// Database connection --------------------
let database = null;

try {
database = await mysql.createConnection(dbConfig);
} catch (error) {
    console.log(`Error creating database connection: ${error.message}`);
    process.exit();
}

export default database;
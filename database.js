// Imports --------------------------------
import mysql from 'mysql/promise';

// Database configuration -----------------
const dbConfig = {
    databse: 'unibasedatabase', //this is the db that we imported in the first vid
    port: 3306, //port from the XAMPP
    host: 'localhost', //running in our local machine
    user: 'root',
    password: '',
    namedPlaceholders: true,
};

// Database connection --------------------
const database = mysql.createConnection(dbConfig);

export default database;
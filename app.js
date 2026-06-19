// imports -----------------------------------
import express from 'express';
import database from './database.js';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// controllers -----------------------------

const modulesController = async (req, res) => {
    // Initialisation ----------------------

    let table = 'Modules'; //name of table
    let fields = [
        'ModuleID', 
        'ModuleCode', 
        'ModuleName', 
        'ModuleLevel', 
        'ModuleYearID', 
        'ModuleLeaderID', 
        'ModuleImageURL',
    ];

    // Resolve Foreign Keys -----------------
    
    table = `(${table} LEFT JOIN Years ON ModuleYearID=YearID)`;
    fields = [...fields, 'YearName AS ModuleYearName'];

    table = `(${table} LEFT JOIN Users ON ModuleLeaderID=UserID)`;
    fields = [...fields, 'CONCAT(UserFirstName, " " ,UserLastName) AS ModuleLeaderName']

    // Build and execute query --------------

    const sql = `SELECT ${fields} FROM ${table}`;

    try{
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: 'No records(s) found...'});
        else res.status(200).json(result);

    }catch(error) {
        res.status(500).json({message: 'Failed to execute query: ${error.message}'});
    }
};

// endpoints -------------------------------

app.get('/api/modules', modulesController)

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
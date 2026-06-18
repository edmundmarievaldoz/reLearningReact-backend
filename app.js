// imports -----------------------------------
import express from 'express';
import database from './database.js';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// controllers -----------------------------

const modulesController = async (req, res) => {
    const table = 'Modules'; //name of table
    const fields = [
        'ModuleID', 
        'ModuleCode', 
        'ModuleName', 
        'ModuleLevel', 
        'ModuleYearID', 
        'ModuleLeaderID', 
        'ModuleImageURL',
    ];

    const sql = `SELECT ${fields} FROM ${table}`;
    const [result] = await database.query(sql);
    res.json(result);
};

// endpoints -------------------------------

app.get('/api/modules', modulesController)

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
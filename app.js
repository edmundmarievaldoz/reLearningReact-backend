// imports -----------------------------------
import express from 'express';
import database from './database.js';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// controllers -----------------------------

const modulesController = async (req, res, variant) => {
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
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE ModuleID=${id}`;
        break;

        case 'leader':
            where = `WHERE ModuleLeaderID=${id}`;
            break;

         case 'users':
            table = `(${table} INNER JOIN Modulemembers ON ModuleID=ModulememberModuleID)`;
            where = `WHERE ModulememberUserID=${id}`;
            break
    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`;

    try{
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: 'No records(s) found...'});
        else res.status(200).json(result);

    }catch(error) {
        res.status(500).json({message: 'Failed to execute query: ${error.message}'});
    }
};

const yearsController = async (req, res, variant) => {
    // Initialisation ----------------------

    let table = 'Years'; //name of table
    let fields = [
        'YearID',
        'YearName',
    ];

    // Resolve Foreign Keys -----------------

    // Build and execute query --------------
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE YearID=${id}`;
        break;

    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`;

    try{
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: 'No records(s) found...'});
        else res.status(200).json(result);

    }catch(error) {
        res.status(500).json({message: 'Failed to execute query: ${error.message}'});
    }
};

const usertypesController = async (req, res, variant) => {
    // Initialisation ----------------------

    let table = 'Usertypes'; //name of table
    let fields = [
        'UsertypeID',
        'UsertypeName',
    ];

    // Resolve Foreign Keys -----------------

    // Build and execute query --------------
    let where = '';
    const id = parseInt(req.params.id);

    switch(variant) {
        case 'primary':
            where = `WHERE UsertypeID=${id}`;
        break;

    }

    const sql = `SELECT ${fields} FROM ${table} ${where}`;

    try{
        const [result] = await database.query(sql);
        if(result.length === 0) res.status(404).json({message: 'No records(s) found...'});
        else res.status(200).json(result);

    }catch(error) {
        res.status(500).json({message: 'Failed to execute query: ${error.message}'});
    }
};


// endpoints -------------------------------

app.get('/api/modules', (req, res) => modulesController(req, res, null));
app.get('/api/modules/:id', (req, res) =>  modulesController(req, res, 'primary'));
app.get('/api/modules/leader/:id', (req, res) =>  modulesController(req, res, 'leader'));
app.get('/api/modules/users/:id', (req, res) =>  modulesController(req, res, 'users'));

app.get('/api/years', (req, res) => yearsController(req, res, null));
app.get('/api/years/:id', (req, res) =>  yearsController(req, res, 'primary'));

app.get('/api/usertypes', (req, res) => usertypesController(req, res, null));
app.get('/api/usertypes/:id', (req, res) =>  usertypesController(req, res, 'primary'));

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
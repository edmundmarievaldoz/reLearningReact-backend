// imports -----------------------------------
import express from 'express';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// controllers -----------------------------

const modulesController = (req, res) => {
    const table = 'Modules'; //name of table
    const fields = ['ModuleID', 'ModuleCode', 'ModuleName', 'ModuleLevel', 'ModuleYearID', 'ModuleLeaderID', 'ModuleImageURL'];
    const sql = `SELECT ${fields} FROM ${table}`;
    res.send(sql)
};

// endpoints -------------------------------

app.get('/api/modules', modulesController)

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
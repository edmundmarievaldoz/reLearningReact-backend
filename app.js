// imports -----------------------------------
import express from 'express';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// endpoints -------------------------------

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
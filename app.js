// imports -----------------------------------
import express from 'express';

// configure express app -------------------
const app = new express();


// configure middleware --------------------

// endpoints -------------------------------

app.get('/hello', (req, res) => res.send("Hi my name is Edmund")); // of we call on /hello it will display the message inside

// start server ----------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
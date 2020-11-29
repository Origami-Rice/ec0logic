// const { Db } = require('mongodb');

// const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');
const express = require('express');
const app = express();
// These will handle all of our routes
const inventory = require('./routes/inventory.js');
const users = require('./routes/users.js');
const food_library = require('./routes/foodlib.js');
const history = require('./routes/history');
const shoppinglist = require('./routes/shoppinglist')
const tips = require('./routes/tips');

let cors = require('cors');
app.use(cors());

// Routes
app.use('/api/inventory', inventory);
app.use('/api/users', users);
app.use('/api/food-library', food_library);
app.use('/api/history', history);
app.use('/api/shoppinglist', shoppinglist);
app.use('/api/tips', tips);

// to catch any other path and return 404
app.use(function (request, response) {
  response.status(404).send("Sorry, we can't find that in Ecoders api!")
});

// ASK WHAT THIS IS FOR ????????????????????????????????????????????????????????
app.get("/", function (req, res) {
    res.send("<h1>Test statement</h1>")
});

module.exports = app;
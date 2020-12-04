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
const shoppinglist = require('./routes/shoppinglist');
const tips = require('./routes/tips');
const recipe = require('./routes/recipes.js');
let cors = require('cors');
app.use(cors());

// Using the express-session middleware
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// consider using a config.json ?????????????????????????????????????????????????????????????????????????????????????????
const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
app.use(session({
  name: 'wasteless.sid',
  secret: 'please change this secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: mongodbUrl })
}));

// Routes
app.use('/api/inventory', inventory);
app.use('/api/users', users);
app.use('/api/food-library', food_library);
app.use('/api/history', history);
app.use('/api/shoppinglist', shoppinglist);
app.use('/api/tips', tips);
app.use('/api/recipe', recipe)
// to catch any other path and return 404
app.use(function (request, response) {
  response.status(404).send("Sorry, we can't find that in Ecoders api!")
});

// ASK WHAT THIS IS FOR ????????????????????????????????????????????????????????
app.get("/", function (req, res) {
    res.send("<h1>Test statement</h1>")
});

module.exports = app;
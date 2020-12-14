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
const ghg_calculator = require('./routes/ghgcalculator.js');

let cors = require('cors');
app.use(cors());

// Using the express-session middleware to manage a user's session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// Set up the link that allows for the connection to the database that will
// store the sessions.
const fs = require('fs');
const path = require('path');
const config_param = fs.readFileSync(path.resolve(__dirname, "./config.json"), 'utf-8');
const configJson = JSON.parse(config_param);
const mongodbUrl = `mongodb+srv://${configJson.mongo.user}:${configJson.mongo.password}@cluster0-oslmy.mongodb.net/${configJson.mongo.user_db}?retryWrites=true&w=majority`;
// Initialize a session
app.use(session({
    name: 'wasteless.sid',
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: mongodbUrl })
}));

// Middleware to handle requests to the routes
app.use('/api/inventory', inventory);
app.use('/api/users', users);
app.use('/api/food-library', food_library);
app.use('/api/history', history);
app.use('/api/shoppinglist', shoppinglist);
app.use('/api/tips', tips);
app.use('/api/recipe', recipe);
app.use('/api/ghgcalculator', ghg_calculator); 

// to catch any other path and return 404
app.use(function (request, response) {
    response.status(404).send("Sorry, we can't find that in Wasteless App api!");
});

module.exports = app;
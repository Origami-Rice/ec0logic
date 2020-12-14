const fs = require('fs');
const path = require('path');
const config_param = fs.readFileSync(path.resolve(__dirname, "../config.json"), 'utf-8');
const configJson = JSON.parse(config_param);

// Name of the database
const db = configJson.mongo.foodlib_db;
// Name of the collection in the database
const foodlib_collection = "items";
// Database query template
const executeQuery = require('../utilities/mongoConnect').executeQuery;
// CommonFood document schema
const {CommonFood} = require('../models/schemas');

//////////////////// Common Food Library Queries ////////////////////
exports.get_common_food = async () => {
    // Return all the foods in our food library
    return await executeQuery(db, async (db) => await db.collection(foodlib_collection).find().sort({name: 1}).toArray());
};

exports.add_common_food = async (name, days) => {
    // Add a common food item to the food library
    const newCommonFood = new CommonFood({
        name: name,
        days: days
    });
    return await executeQuery(db, async (db) => await db.collection(foodlib_collection).insertOne(
        newCommonFood));
};

exports.remove_common_food = async (name) => {
    // Remove item from food-library
    return await executeQuery(db, async (db) => await db.collection(foodlib_collection).deleteOne({name: name}));
};
const db = "food-library";
const foodlib_collection = "items";
const executeQuery = require('../utilities/mongoConnect').executeQuery;

const {CommonFood} = require('../models/schemas');

//////////////////// Common Food Library Queries ////////////////////
exports.get_common_food = async () => {
    // Return all the foods in our food library
    return await executeQuery(db, async (db) => await db.collection(foodlib_collection).find().sort({name: 1}).toArray());
};

exports.add_common_food = async (name, days) => {
    //return await executeQuery(db, async (db) => await db.collection(foodlib_collection).insertOne(
    //    {name: name, days: days}));
    const newCommonFood = new CommonFood({
        name: name,
        days: days
    });
    return await executeQuery(db, async (db) => await db.collection(foodlib_collection).insertOne(
        newCommonFood));
};

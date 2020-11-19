// // im testing things
// const MongoClient = require('mongodb').MongoClient;
// const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
// we can change these when we understand how things work i guess
const db = "test_wasteless";
const food_lib_collection = "food_library"
const users_collection = "test_users";
const executeQuery = require('../utilities/mongoConnect').executeQuery;

//////////////////// USER QUERIES ////////////////////
exports.add_user = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        { username: username, inventory_list: [], wasted_items: [], shopping_list: [] }));
};

exports.remove_user = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).deleteOne(
        {username: username}
    ));
};

//////////////////// INVENTORY QUERIES ////////////////////

exports.get_inventorylist = async (username) => {
    // Query the database for the user and inventory list
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}, {username: 1, inventory_list: 1}
    ));
};

exports.update_inventorylist = async (username, list) => {
    // Update the specified user's inventory with list
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {inventory_list: list}}
    ));
}

//////////////////// WASTED FOOD HISTORY QUERIES ////////////////////
exports.add_item_to_wasted_history = async (username, item) => {
    // items added to the wasted_items array field will be sorted by most recent date
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        { username: username },
        { $push: { wasted_items: { $each: [item], $sort: { date: -1 } } } }
    ));
};

exports.get_entire_history = async (username) => {
    // return the wasted items list for the specified user
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username, username},
        {username: 1, wasted_items: 1}
    ));
};

//////////////////// Common Food Library Queries ////////////////////
exports.get_common_food = async () => {
    // Return all the foods in our food library
    // return await executeQuery("food-library", async (db) => await db.collection("items").findOne(
    //     {name: "Apple"}, {days: 3} ));
    return await executeQuery("food-library", async (db) => await db.collection("items").find().toArray());
    // var cursor = db.collection("items").find({}).toArray(function(err,arr)){
    //     return arr;
    // }
};

exports.add_common_food = async (name, days) => {
    return await executeQuery("food-library", async (db) => await db.collection("items").insertOne(
        {name: name, days: days}));
};

////////////////// Shopping list queries /////////////////////

exports.get_shopping_list = async (username) => {
    // 
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username, username},
        {username: 1, shoppping_list: 1}
    ));
};

exports.add_item_to_shopping_list = async (username, item) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne (
        {username: username}, {$push: { shopping_list: { $each: [item], $sort: {name: 1}} }}
    ))
}

exports.remove_item_from_shopping_list = async (username, item) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username},
        {$pull: { shopping_list: {name: item}} }
    ));

}

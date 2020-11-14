// // im testing things
// const MongoClient = require('mongodb').MongoClient;
// const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
// we can change these when we understand how things work i guess
const users_collection = "test_users";
const db = "test_wasteless";
const executeQuery = require('../utilities/mongoConnect').executeQuery;

exports.add_user = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        {username: username, inventory_list: []}));
};

//////////////////// INVENTORY QUERIES ////////////////////
exports.add_item_to_inventorylist = async (username, item) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$addToSet: {inventory_list: {$each: [item], $sort: 1}}}));
};

exports.get_inventorylist = async (username) => {
    // Query the database for the user and inventory list
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}, {username: 1, inventory_list: 1} ));
};

exports.remove_item_from_inventory = async (username, itemName) => {
    // Update the document for the given user by removing the
    // specified item from their inventory.
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        { username: username },
        { $pull: { inventory_list: { name: itemName } } }
    ));
};

exports.update_inventory_item = async (username, itemName, expiryDate, quantity, weight) => {
    // Update the specified item with the specified information
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        // update first element in array that matches the filter criteria
        { username: username, "inventory_list.name": itemName },
        { $set: { "inventory_list.$.expiryDate": expiryDate,
                  "inventory_list.$.quantity": quantity,
                  "inventory_list.$.weight": weight } }
    ));
};
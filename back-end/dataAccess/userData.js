// // im testing things
// const MongoClient = require('mongodb').MongoClient;
// const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
// we can change these when we understand how things work i guess
const db = "test_wasteless";
const food_lib_collection = "food_library"
const users_collection = "test_users";
const executeQuery = require('../utilities/mongoConnect').executeQuery;

exports.add_user = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        { username: username, inventory_list: [], wasted_items: [], shopping_list: [] }));
};

//////////////////// INVENTORY QUERIES ////////////////////
exports.add_item_to_inventorylist = async (username, item) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username},
        // {$addToSet: {inventory_list: item}}
        {$push: {inventory_list: {$each: [item], $sort: {name: 1}}}}
    ));
};

exports.check_if_item_in_inventory = async (username, itemName) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        // {username: username, "inventory_list.$.name": { $exists: true, $in: [ itemName ] }}
        { username: username,
          $and: [{'inventory_list.0': {$exists: true}},
                 {"inventory_list.name": itemName}]},
        {username: 1}
    ));
};

exports.get_inventorylist = async (username) => {
    // Query the database for the user and inventory list
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}, {username: 1, inventory_list: 1}
    ));
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
    return await executeQuery(db, async (db) => await db.collection(food_lib_collection).find(
        {name: 1, days: 1} ));
};

exports.add_common_food = async (name, days) => {
    return await executeQuery(db, async (db) => await db.collection(food_lib_collection).insertOne(
        {name: name, days: days}));
};

////////////////// Shopping list queries /////////////////////

exports.get_shopping_list = async (username) => {
    // 
    return await executeQuery(db, async (db) => await db.collection(users_collection).findone(
        {username: username}, {username: 1, shopping_list: 1}
    ))
}

exports.add_item_to_shopping_list = async (username, item) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateone (
        {username: username}, {$push: { shopping_list: { $each: [item], $sort: {name: 1}} }}
    ))
}
// Name of the database
const db = "test_wasteless";
// Name of the collection in the database
const users_collection = "test_users";
// Database query template
const executeQuery = require('../utilities/mongoConnect').executeQuery;
// User document schema
const {User} = require('../models/schemas'); 

////////////////////////////// USER QUERIES //////////////////////////////
exports.add_user = async (username, email, password, salt, firstname, lastname, question, answer) => {
    // create a new document and save it in the collection of users
    const newUser = new User({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        salt: salt,
        question: question,
        answer: answer, 
        inventory_list: [], 
        wasted_items: [], 
        shopping_list: [],
        saved_recipes: [],
        saved_tips: []
    });
    console.log(newUser); 
    
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        newUser));
};

exports.find_user_by_username = async (username) => {
    // Query database for, and return, the document of the specified user
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}));
};

exports.remove_user = async (username) => {
    // remove a user document with the specified username from the database
    return await executeQuery(db, async (db) => await db.collection(users_collection).deleteOne(
        {username: username}
    ));
};

exports.update_email = async (username, email) => {
    // update the email of the specified user
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {email: email, username: email}}));
};

exports.update_password = async (username, password, salt) => {
    // update the password of the specified user
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {password: password, salt: salt}}));
};

////////////////////////////// INVENTORY QUERIES //////////////////////////////
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

////////////////////////////// WASTED FOOD HISTORY QUERIES //////////////////////////////
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

////////////////////////////// SHOPPING LIST QUERIES //////////////////////////////
exports.get_shopping_list = async (username) => {
    // gets the user's shopping list
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username, username},
        {username: 1, shopping_list: 1}
    ));
};

exports.add_item_to_shopping_list = async (username, item) => {
    // adds a new item to the user's shopping list
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne (
        {username: username}, {$push: { shopping_list: { $each: [item], $sort: {name: 1}} }}
    ))
}

exports.remove_item_from_shopping_list = async (username, item) => {
    // removes a existing item from the user's shopping list
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username},
        {$pull: { shopping_list: {name: item}} }
    ));

}

exports.update_shopping_list = async(username, newList) => {
    // updates the user's shopping list with a new and updated shopping list
    return await executeQuery(db, async (db) => await db.collection(users_collection).update(
        {username: username}, {$set: {shopping_list: newList}}
    ));
};

////////////////////////////// TIP QUERIES //////////////////////////////
exports.get_tips = async (username) => {
    // query database for, and return, the user's saved tips
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}, {username: 1, saved_tips: 1}
    ));
};

exports.update_tips = async (username, tips) => {
    // update the user's saved tips in the database
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username},  {$set: {saved_tips: tips}}
    ));
};

////////////////////////////// RECIPE QUERIES //////////////////////////////
exports.get_saved_recipes = async (username) => {
    // gets the user's saved_recipes
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username, username},
        {username: 1, saved_recipes: 1}
    ));
};

exports.add_recipe_to_saved_recipes = async (username, item) => {
    // adds a new item to the user's saved_recipes
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne (
        {username: username}, {$push: { saved_recipes: { $each: [item], $sort: {name: 1}} }}
    ))
};

exports.remove_recipe_from_saved_recipes = async (username, recipe) => {
    // removes a existing item from the user's saved_recipes
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username},
        {$pull: { saved_recipes: {recipe}} }
    ));
};
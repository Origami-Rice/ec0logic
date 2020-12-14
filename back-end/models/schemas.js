'use strict';

const mongoose = require('mongoose')

// Template for the data that is stored about an inventory list item.
const InventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    expiryDate: Date,
    quantity: Number,
    weight: Number,
    unitsOfMeasure: {
        type: String,
        default: "units"
    }
});

// Template for the data that is stored about a common food item.
const CommonFoodSchema = new mongoose.Schema({
    name: String,
    days: Number,
});

// Template for the data that is stored about a wasted food item.
const WastedItemSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    quantity: Number,
    weight: Number,
    kilograms: Number
});

// Template for the data that is stored about a shopping list item.
const ShoppingListItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    quantity: Number,
    checked_off: Boolean,
    unitsOfMeasure: String
});

// Template for the data that is stored about a recipe.
const RecipeSchema = new mongoose.Schema({
    id: Number,
    title: String,
    readyInMinutes: Number,
    servings: Number,
    sourceUrl: String,
    image: String,
});

// Template for the data that is stored about a tip.
const TipsSchema = new mongoose.Schema({
    tipNum: Number
});

// Template for the data that is stored about a user. 
// Note that the usertype field which distinguishes between admin and
// regular users is currently not in use but can be taken advantage of
// during future development 
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    usertype: { //false for regular user, true for admin
        type: Boolean,
        default: false
    },
    question: {
        type: String, 
        required: true 
    }, 
    answer: {
        type: String, 
        required: true 
    },
    inventory_list: [InventoryItemSchema],
    wasted_items: [WastedItemSchema],
    shopping_list: [ShoppingListItemSchema],
    saved_recipes: [RecipeSchema],
    saved_tips: [TipsSchema]
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function (next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
const CommonFood = mongoose.model("CommonFood", CommonFoodSchema);
module.exports = {User: User, CommonFood: CommonFood};
'use strict';

const mongoose = require('mongoose')

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

const CommonFoodSchema = new mongoose.Schema({
    name: String,
    days: Number,
});

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
    weight: Number
});

const ShoppingListSchema = new mongoose.Schema({
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
// // MAY NEED TO MODIFY ????????????????????????????????????????
const RecipeSchema = new mongoose.Schema({
     name: String,
     link: String,
     ingrediants: String,
     directions: String,
     image: String
});
// MAY NEED TO MODIFY ????????????????????????????????????????
const TipsSchema = new mongoose.Schema({
    tipNum: Number
});
// MAY NEED TO MODIFY ????????????????????????????????????????
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    surname: {
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
    //false for regular user, true for admin
    usertype: {
        type: Boolean,
        default: false
    },
    inventory_list: [InventoryItemSchema],
    wasted_items: [WastedItemSchema],
    shopping_list: [ShoppingListSchema],
    saved_recipes: [RecipeSchema],
    fav_tips: [TipsSchema]
});

// MAY NEED TO MODIFY ????????????????????????????????????????
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
//module.exports = {UserSchema: UserSchema, CommonFoodSchema: CommonFoodSchema};
module.exports = {User: User, CommonFood: CommonFood};

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
    checked_off: Boolean
    
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    inventory_list: [InventoryItemSchema],
    wasted_items: [WastedItemSchema],
    shopping_list: [ShoppingListSchema]
});

const User = mongoose.model('User', UserSchema);
const CommonFood = mongoose.model("CommonFood", CommonFoodSchema);
module.exports = { User, CommonFood };


'use strict';

const mongoose = require('mongoose')

const InventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    expiryDate: { 
        type: Date,
        default: Date.now 
    },
    quantity: Number,
    weight: Number
});

const CommonFoodSchema = new mongoose.Schema({
    name: String,
    expiryDate: Date,
});

const WastedItemSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: Number,
    quantity: Number,
    weight: Number
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
    wasted_items: [WastedItemSchema]
});

const User = mongoose.model('User', UserSchema);
const CommonFood = mongoose.model("CommonFood", CommonFoodSchema);
module.exports = { User, CommonFood };


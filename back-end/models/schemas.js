'use strict';

const mongoose = require('mongoose')

const InventoryItemSchema = new mongoose.Schema({
    name: String,
    expiryDate: { type: Date, default: Date.now },
    quantity: Number,
    weight: Number
});

const CommonFoodSchema = new mongoose.Schema({
    name: String,
    expiryDate: Date,
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    inventory_list: [InventoryItemSchema]
})

const User = mongoose.model('User', UserSchema);
module.exports = { User }


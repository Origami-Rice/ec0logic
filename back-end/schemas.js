'use strict';

const mongoose = require('mongoose')

const InventoryItemSchema = new mongoose.Schema({
    name: String,
    expiryDate: String,
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
    inventory: [InventoryItemSchema]
})
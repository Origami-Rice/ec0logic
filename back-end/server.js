const { Db } = require('mongodb');

// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
const app = express()
// These will handle all of our routes
const inventory = require('./routes/inventory.js')

const Item = require('./models/schemas');

let cors = require('cors');


app.use(cors());

// Routes
app.use("/api/inventory", inventory);

// Connecting to DB - test
const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true})

.then(() =>  {
    console.log('connected')
})

app.get('/inventory', (req, res) => {
    const item = new Item({
        name: 'carrot',
        expiryDate: 'Oct 13, 2020',
        quantity: 5,
        weight: 1
    });

    item.save()
        .then((result) => {
            res.send(result)
            console.log('sent')
        })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Started listening on port 5000!'));
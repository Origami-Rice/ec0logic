const { Db } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const express = require('express');
const Item = require('./schemas');

const app = express()


let cors = require('cors');
const PORT = process.env.PORT || 5000;


app.use(cors());

const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true})

.then(() =>  {
    console.log('connected')
})

app.get('/', (req, res) => {
    const item = new Item({
        name: 'Banana',
        expiryDate: 'November 15, 2020',
        quantity: 2,
        weight: 6
    });

    item.save()
        .then((result) => {
            res.send(result)
            console.log('sent')
        })
})

app.listen(PORT, () => console.log('Started listening on port 5000!'));
const express = require('express');
const router = express.Router();
const {
    get_user
} = require('../dataAccess/userData')

router
    .route('/:username')
    .get((request, response) => {
        console.log('GET request to path /api/inventory/:username');
        // Decription: return all items in <username>'s inventory
        // TODO: implement
        // const result = get_user()
        // console.log(result)

    })
    .post((request, response) => {
        console.log('POST request to path /api/inventory/:username');
        // Description: Add a new item to <username>'s inventory
        // TODO 1: Define the structure of how you want data to be received
        //      (i.e. what fields are required in JSON object?)
        // TODO 2: Store the new item in the DB
    })

router
    .route('/:username/expiring')
    .get((request, response) => {
        console.log('GET request to path /api/inventory/:username/expiring');
        // Decription: return all items in <username>'s inventory that
        // expiring soon
        // TOOD: implement
        // --- Possibly get all the items in the user's inventory from DB
        // --- and then filter the ones that have expiry dates within one week
    })

router
    .route('/:username/:id')
    .get((request, response) => {
        console.log('GET request to path /api/inventory/:username/:id');
        // Description: return the item in username's inventory specified by id
        // TODO: implement
    })
    .delete((request, response) => {
        console.log('DELETE request to path /api/inventory/:username/:id');
        // Description: delete the item in username's inventory specified by id
        // TODO: implement
    })
    .put((request, response) => {
        console.log('PUT request to path /api/inventory/:username/:id');
        // Description: update the item in username's inventory specified by id
        // with the new data sent by client
        // TODO: implement
    })


module.exports = router;

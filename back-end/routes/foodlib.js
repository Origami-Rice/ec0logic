const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(async (request, response) => {
        console.log('GET request to path /api/food-library');
        // TODO: Return all the foods in our library of "common food" items
        // Include their name and approximate shelf life in days, months, or years
    }); 

module.exports = router;


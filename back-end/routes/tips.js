// This file is from the existing code provided by our partner
// and was modified for our use.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_tips,
    update_tips
} = require("../dataAccess/userData");

// Routes
router
    .route("/:username")
    .get(async (request, response) => {
        // Description: Return the user's saved tips list.
        console.log('GET request to path /tips/:username');
        const username = request.params.username;

        try {
            // get the user's saved tips
            const result = await get_tips(username);
            if (result && result.fav_tips) {
                return response
                    .status(200)
                    .json(result.fav_tips);
            } else {
                return response
                    .status(404)
                    .json({"error": "user or fav_tips not found"});
            }
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/add/:username/:id")
    .post(async (request, response) => {
        // Description: Add a tip to a user's saved tips list.
        console.log('POST request to path /tips/add/:username/:id');
        const username = request.params.username;
        const id = request.params.id;

        try {
            // get the user's previous saved tips
            const result = await get_tips(username);
            if (result && result.fav_tips) {
                var previous_tips = result.fav_tips;
                // checks the user's previous tips (which i believe is a list of ids)
                // for the tip that they want to add (i.e. matching id)
                var exists = previous_tips.filter(item => item === id); 
                console.log(exists);
                if (exists.length) {
                    return response 
                        .status(209)
                        .json({"error": "the tip is already added"});
                } 
            } else {
                return response
                    .status(404)
                    .json({"error": `the user with username ${username} not found`});
            }
        } catch (error) {
            console.log(error);
        }

        // the tip isn't in the user's previously saved tips so add it
        try {
            const tips = [...previous_tips, id];
            const added = await update_tips(username, tips);
            if (added) {
                return response
                    .status(200)
                    .json({"success": "the tip was added to tips"});
            } else {
                return response
                    .status(500)
                    .json({"error": "server error, could not modify tips"});
            }
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/delete/:username/:id")
    .post(async (request, response) => {
        // Description: Remove a tip from a user's favourite tips list
        console.log('DELETE request to path /tips/delete/:username/:id');

        const username = request.params.username;
        const id = request.params.id

        try {
            // get the user's previous tips
            const result = await get_tips(username);
            if (result && result.fav_tips) {
                var previous_tips = result.fav_tips;
                // checks the user's previous tips (which i believe is a list of ids)
                // for the tips that they don't want to remove (i.e. non matching id)
                var new_tips = previous_tips.filter(item => item !== id); 
            } else {
                return response
                    .status(404)
                    .json({"error": `user with username ${username} not found`});
            }
        } catch (error) {
            console.log(error);
        }

        // update the user's saved_tips list
        try {
            const removed = await update_tips(username, tips);
            if (removed) {
                return response
                    .status(200)
                    .json({"success": "the tip was removed"});
            } else {
                return response
                    .status(500)
                    .json({"error": "server error, could not modify tips"});
            }
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
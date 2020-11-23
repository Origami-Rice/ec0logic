// Temporary file used to create simple user documents in the database for testing
// Will be replaced with the file from the code provided by our partner.
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    add_user
} = require('../dataAccess/userData')


router
    .route('/newuser')
    .post(async (request, response) => {
        console.log('POST request to path /api/users/newuser');
        const username = request.body.username;
        try {
            const user = await add_user(username);

            if (user) {
                return response
                    .status(200)
                    .json({ success: "user " + username + " added" });
            }
            return response.status(500).json({ error: "Internal server error" });
        } catch (error) {
            console.log(error);
        }
    })

router
    .route('/deleteuser')
    .post(async (request, response) => {
        console.log('DELETE request to path /api/users/deleteuser');
        const username = request.body.username;
        try {
            const user = await remove_user(username);

            if (user) {
                return response
                    .status(200)
                    .json({ success: "user " + username + " deleted" });
            }
            return response.status(500).json({ error: "Internal server error" });
        } catch (error) {
            console.log(error);
        }
    })
module.exports = router ;
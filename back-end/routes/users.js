// Temporary file used to create simple user documents in the database for testing
// Will be replaced with the file from the code provided by our partner.
const bodyParser = require("body-parser");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    add_user,
    find_user_by_username,
    update_email,
    update_password
} = require('../dataAccess/userData')

router
    .route("/signup")
    .post(async (request, response) => {
        // Description: Adds a new user to the database if there is no existing
        // user with the same username.
        console.log("POST request to path /api/users/signup");
        
        // Check if the username is available
        let username = request.body.username;
        try {
            const exists = await find_user_by_username(username);
            if (exists) {
                return response
                    .status(409)
                    .json({ error: "User with this username already exists" });
            }
        } catch (error) {
            console.log(error);
        }

        // Username is available so extract the remaining info from the request
        // body.
        let password = request.body.password;
        let email = request.body.email;
        let firstname = request.body.firstname;
        let surname = request.body.surname;
        console.log(request.body); // ????????????????????????????????????????????????

        // Salt and hash the password
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto.createHmac("sha512", salt);
        hash.update(password);
        let saltedHash = hash.digest("base64");
        password = saltedHash;

        // Add a new user to the database
        try {
            const user = await add_user(username, email, password, salt, firstname, surname);

            if (user) {
                // SESSION STUFF that i still don't understand

                return response
                    .status(200)
                    .json({ success: "user " + username + " signed up" });
            } 

            // Could not create user
            return response
                .status(500)
                .json({ error: "Internal server error" });
        } catch (error) {
            console.log(error);
        }
    });


// router
//     .route('/newuser')
//     .post(async (request, response) => {
//         console.log('POST request to path /api/users/newuser');
//         const username = request.body.username;
//         try {
//             const user = await add_user(username);

//             if (user) {
//                 return response
//                     .status(200)
//                     .json({ success: "user " + username + " added" });
//             }
//             return response.status(500).json({ error: "Internal server error" });
//         } catch (error) {
//             console.log(error);
//         }
//     })

router
    .route("/signin")
    .post(async (request, response) => {
        // Description:
        console.log("POST request to path /api/users/signin");
        
        // Check if the information for a valid user has been entered
        var username = request.body.username;
        var password = request.body.password;
        try {
            const user = await find_user_by_username(username);
            console.log(user);
            if (!user) { // Could not find the user in the database
               return response
                   .status(409)
                   .json({ error: "Username or password is incorrect." });
            }

            // A user with the given username exists
            // Salt and hash the password given by the user
            let salt = user.salt;
            console.log(salt);
            var hash = crypto.createHmac("sha512", salt);
            hash.update(password);
            var saltedHash = hash.digest("base64");
            password = saltedHash;

            // Compare it with the one in the database
            console.log(user.password);
            console.log(password);
            if (user.password !== password) {
                return response.status(401).json({ error: "Username or password is incorrect." });
            }
            
            // COOKIE STUFF that i still don't understand
            // SESSION STUFF that i still don't understand

            return response
                .status(200)
                .json({ success: "user " + username + " signed in" });
        } catch (error) {
            console.log(error);
        }
    });

// // MAY BE NEEDED LATER ONCE THE SESSION STUFF IS FIGURED OUT
// router.get("/isauthenticated", async function(req, res) {
//     if (req.session.username) {
//         const user = await find_user_by_username(req.session.username);
//         console.log(user);
//         return res.json({isauth: true, username: req.session.username, firstname: user.name, experience: user.experience});
//     }
//     return res.json({ isauth: false, username: null, firstname: null });
// });

router
    .route("/signout")
    .post(async (request, response) => {
        // Description:
        console.log("POST request to path /api/users/signout");
        // COOKIE STUFF that i still don't understand
        // SESSION STUFF that i still don't understand

    });

router
    .route("/email/:username")
    .patch(async (request, response) => {
        // Description:
        console.log("PATCH request to path /api/users/email/:username");
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        const email =  request.body.email;

        // Update the email
        try {
            const result = await update_email(username, email);
            if (result && result.modifiedCount) { // Maybe remove modifiedCount check??????????????????
                return response
                    .status(200)
                    .json({message: `Updated the email of the user ${username}`});
            }

            return response
                .status(404)
                .json({error: "User with the given username not found or email unchanged"});
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/password/:username")
    .patch(async (request, response) => {
        // Description: 
        console.log("PATCH request to path /api/users/password/:username");

        // Salt and hash the new password
        let password = request.body.password;
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto.createHmac("sha512", salt);
        hash.update(password);
        let saltedHash = hash.digest("base64");
        password = saltedHash;

        // Update the password
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        try {
            const result = await update_password(username, password, salt);
            if (result && result.modifiedCount) { // Maybe remove modifiedCount check??????????????????
                return response
                    .status(200)
                    .json({message: `Updated the password of the user ${username}` });
            }
            return response
                .status(404)
                .json({error: "User with the given username not found or password unchanged."});
        } catch (error) {
            console.log(error);
        }
    });


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
    });

// router.delete("/all", async function(req, res) {
//    let result = await delete_users();
//    res.send(result);
// });

module.exports = router;
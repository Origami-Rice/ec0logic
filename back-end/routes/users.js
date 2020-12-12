// Contains the routes for authenticating and creating users.
const bodyParser = require("body-parser");
const crypto = require("crypto");
const express = require("express");
const cookie = require("cookie");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    add_user,
    find_user_by_username,
    update_email,
    update_password, 
    remove_user 
} = require('../dataAccess/userData')

// How long to save the session cookie in days
const cookieDays = 2; 

//Checks all information fields of a user attempting to sign up 
function fieldsAreValid(username, email, password, firstname, lastname, question, answer){
    const fields = [username, email, password, firstname, lastname, question, answer]; 
    var i; var valid = true;  
    for (i = 0; i < fields.length && valid; i++){
        if (!(typeof fields[i] == 'string' && fields[i] != "")){
            valid = false; 
        }
    }
    return valid; 
}

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
        let lastname = request.body.lastname;

        let question = request.body.question; 
        let answer = request.body.answer; 

        //basic check that fields are nonempty strings 
        if (!fieldsAreValid(username, password, email, firstname, lastname, question, answer)){
            return response
                .status(422)
                .json({ error: "One of the required fields is missing or invalid"});
        }    

        // Salt and hash the password
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto.createHmac("sha512", salt);
        hash.update(password);
        let saltedHash = hash.digest("base64");
        password = saltedHash;

        // Salt and hash the security question answer 
        let answerHash = crypto.createHmac("sha512", salt);  //previous hash object can't be used again after digest 
        answerHash.update(answer); 
        let saltedAnswerHash = answerHash.digest("base64"); 
        answer = saltedAnswerHash;

        // Add a new user to the database
        try {
            const user = await add_user(username, email, password, salt, firstname, lastname, question, answer);

            if (user) {
                // Store the user's username in the session
                request.session.username = username;
                // Attach a cookie to the response
                response.setHeader(
                    "Set-Cookie",
                    cookie.serialize("username", username, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * cookieDays // days in seconds
                    })
                );
                // Return the response
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

router
    .route("/signin")
    .post(async (request, response) => {
        // Description: Checks if the username and password provided belong
        // to an exisitng user.
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
                   .json({ error: "User with this username does not exist." });
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
                return response
                    .status(401)
                    .json({ error: "Username or password is incorrect." });
            }
            
            // Store the user's username in the session
            request.session.username = username;
            console.log(request.session);
            // Attach a cookie to the response
            response.setHeader(
                "Set-Cookie",
                cookie.serialize("username", username, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * cookieDays // days in seconds
                })
            );

            return response
                .status(200)
                .json({ success: "user " + username + " signed in" });
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/isauthenticated")
    .get(async (request, response) => {
        // Description: Checks whether there is a valid user session active
        console.log("GET request to path /api/users/isauthenticated");
        if (request.session.username) {
            try {
                const user = await find_user_by_username(request.session.username);
                // NOT SURE WHAT EXACTLY SHOULD BE RETURNED / STATUS CODE ??????????????????????????????????????????????????????????
                return response
                    .json({isauth: true, username: request.session.username, firstname: user.firstname});
            } catch (error) {
                console.log(error);
            }
        }
        return response
            .json({ isauth: false, username: null, firstname: null });
    });

router
    .route("/signout")
    .post(async (request, response) => {
        // Description: Destroys the user's current session.
        console.log("POST request to path /api/users/signout");
        
        // Destroys the current session
        request.session.destroy();
        // Set a cookie / why / idk if this is needed tbh ??????????????????????????????????????????????????????????????????
        response.setHeader(
            "Set-Cookie",
            cookie.serialize("username", "", {
                path: "/",
                maxAge: 60 * 60 * 24 * cookieDays // days in seconds
            })
        );
        console.log("Latest session", request.session);
        response
            .status(200)
            .json({ success: "Signed out" });

    });

router
    .route("/email/:username")
    .patch(async (request, response) => {
        // Description: Update the user's email with the new email passed
        // in the body of the request.
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
        // Description: Update the user's password with the new password
        // provided in the body of the request.
        console.log("PATCH request to path /api/users/password/:username");

        // Salt and hash the new password
        let password = request.body.password;
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto.createHmac("sha512", salt);
        hash.update(password);
        let saltedHash = hash.digest("base64");
        password = saltedHash;

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        
        // Update the password
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
    .route('/security/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/users/security/:username')
        const username = request.params.username;
        
        try{
            const user = await find_user_by_username(username); 
            if (!user){
                return response
                   .status(404)
                   .json({ "error": "User not found" });
            } else {
                return response
                    .status(200)
                    .json({"question": user.question})
            }
        } catch (error){
            console.log(error); 
        }
    })
    .post(async (request, response) => {
        console.log('POST request to path /api/users/security/:username');
        const username = request.params.username;
        var answer = request.body.answer; 

        try {
            const user = await find_user_by_username(username);
            console.log(user);
            if (!user) { // Could not find the user in the database
               return response
                   .status(404)
                   .json({ error: "User not found" });
            }

            // A user with the given username exists
            // Salt and hash the password given by the user
            let salt = user.salt;
            console.log(salt);
            var hash = crypto.createHmac("sha512", salt);
            hash.update(answer);
            var saltedHash = hash.digest("base64");
            answer = saltedHash;

            console.log(user.answer);
            console.log(answer);
            if (user.answer !== answer) {
                return response
                    .status(401)
                    .json({ "matched": false });
            } else {
                return response
                    .status(200)
                    .json({"matched": true})
            }
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

module.exports = router;
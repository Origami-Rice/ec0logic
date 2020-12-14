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
const SECRET_KEY = 'abcdef';

//Checks all information fields of a user attempting to sign up. They all must be non-empty strings. 
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

//Salts and hashes password to compare with the user's current password 
function verifyPassword(salt, password, userPassword){
    console.log(salt);
    password = saltAndHash(salt, password);
    return password === userPassword;
}

function saltAndHash(salt, info){
    let hash = crypto.createHmac("sha512", salt);
    hash.update(info);
    let saltedHash = hash.digest("base64");
    return saltedHash; 
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

        // Salt and hash the password and security question answer 
        password = saltAndHash(salt, String(password));
        answer = saltAndHash(salt, String(answer));

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

            console.log(user.password);
            console.log(password);
            if (!verifyPassword(user.salt, password, user.password)) {
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

        const username = request.params.username;
        const email =  request.body.email;

        try {
            const attemptedUsernameChange = await (find_user_by_username(email)); 
            if (attemptedUsernameChange){ //If a user was found, the username is in use
                return response 
                    .status(409)
                    .json({"error": "This email is already in use"}); 
            }
            const result = await update_email(username, email); //updates username and email to email. The previous team had 
                                                                //both of them as identical. 
            const user = await find_user_by_username(email);
            console.log(user)
            if (result && result.modifiedCount) { 
                // await remove_user(String(username)); 

                // Store the user's username in the session
                request.session.username = email;
                console.log(request.session);
                // Attach a cookie to the response
                response.setHeader(
                    "Set-Cookie",
                    cookie.serialize("username", email, {
                        path: "/",
                        maxAge: 60 * 60 * 24 * cookieDays // days in seconds
                    })
                );
                return response
                    .status(200)
                    .json({message: `Updated the email of the user ${username} to ` + email});
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

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        let password = request.body.password; 
        let newPassword = request.body.newPassword;
        let skipVerification = (request.body.key == SECRET_KEY);
        let salt = "";

        try {
            const user = await find_user_by_username(username);
            if (!user){ //case where a user with the given username couldn't be found 
                return response
                .status(404)
                .json({error: "User with the given username not found or password unchanged."});
            }
            salt = user.salt;
            if (!skipVerification && !verifyPassword(user.salt, password, user.password)){
                return response
                    .status(401)
                    .json({"error": "old password doesn't match existing password"}); 
            }
        } catch (error){
            console.log(error); 
        }
        
        newPassword = saltAndHash(salt, newPassword);
        
        // Update the password
        try {
            const result = await update_password(username, newPassword, salt);
            if (result && result.modifiedCount) {
                return response
                    .status(200)
                    .json({message: `Updated the password of the user ${username}` });
            }
            return response 
                .status(404)
                .json({"error": "update failed"})
        } catch (error) {
            console.log(error);
        }
        
    });


router 
    .route('/security/:username')
    .get(async (request, response) => {
        //returns the user's security question 
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
        //verifies if the sent password matches the user's current security question answer
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

            let salt = user.salt;
            answer = saltAndHash(salt, answer);

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
const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

//NOTE: I think the tests occasionally fail because they don't run in order
//if some idiot calls themselves test91, test92, or test93, the tests won't work 
const name = "test91"; const name2 = "test92"; const name3 = "test93";
const signupUrl = "/api/users/signup";
const signinUrl = "/api/users/signin";
const emailUrl = "/api/users/email/"; 
const passwordUrl = "/api/users/password/"
const deleteUrl = "/api/users/deleteuser"


const newUser = {
    "username": name,
    "password": "password",
    "email": name,
    "firstname": "firstName",
    "lastname": "lastname",
    "question": "what city were you born in?",
    "answer": "Toronto"
}

const newUser2 = { 
    "username": name2,
    "password": "password",
    "email": name2,
    "firstname": "firstName",
    "lastname": "lastname",
    "question": "what city were you born in?",
    "answer": "Toronto"
}

const newUserSignIn = {
    "username": name,
    "password": "password"
}

const incorrectPasswordSignin = {
    "username": name,
    "password": "password1"
}

const nonExistentUserSignIn = {
    "username": "isorjgoeijrio",
    "password": "password"
}

const passwordChange = {
    "password": "password",
    "newPassword": "aNewPassword"
}

const invalidEmailChange = {
    "email": name2 
}

const validEmailChange = {
    "email": name3 
}

const invalidUser1 = {  //empty string for password 
    "username": "name",
    "password": "",
    "email": "anEmail@gmail.com",
    "firstname": "firstName",
    "lastname": "lastname",
    "question": "what city were you born in?",
    "answer": "Toronto"
}

describe("user creation", () => {
    test("sign user up to database", async () => {
        // send post request
        const response = await request
            .post(signupUrl)
            .set("Accept", "application/json")
            .send(newUser);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "user " + name + " signed up"});
    });

    test("does not create user with empty fields", async () => {
        const response = await request
            .post(signupUrl)
            .set("Accept", "application/json")
            .send(invalidUser1);
        expect(response.status).toBe(422);
        expect(response.body).toEqual({"error": "One of the required fields is missing or invalid"})
    });

    test("does not create user if their desired username already exists in the database", async () => {
        const response = await request
            .post(signupUrl)
            .set("Accept", "application/json")
            .send(newUser);
        expect(response.status).toBe(409);
        expect(response.body).toEqual({"error": "User with this username already exists"})
    });
});
describe("Sign in", () => {
    test("Succesfully signs in if a username with the entered password exists", async () => {
        const response = await request 
            .post(signinUrl)
            .set("Accept", "application/json")
            .send(newUserSignIn); 
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "user " + name + " signed in"});
    });

    test("Rejects sign in of non-existent username", async () => {
        const response = await request 
            .post(signinUrl)
            .set("Accept", "application/json")
            .send(nonExistentUserSignIn); 
        expect(response.status).toBe(409);
        expect(response.body).toEqual({"error": "User with this username does not exist."});
    });

    test("Rejects sign in if password is incorrect", async () => {
        const response = await request 
            .post(signinUrl)
            .set("Accept", "application/json")
            .send(incorrectPasswordSignin); 
        expect(response.status).toBe(401);
        expect(response.body).toEqual({"error": "Username or password is incorrect."});
    });
});

describe("user info modification and user deletion", () => {
    test("Changes password if the old password matches the current password", async () => {
        const response = await request 
            .patch(passwordUrl + name)
            .send(passwordChange);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Updated the password of the user " + name});
    });

    test("Rejects password change if old password doesn't match the current password", async () => {
        const response = await request 
            .patch(passwordUrl + name)
            .send(passwordChange);
        expect(response.status).toBe(401);
        expect(response.body).toEqual({"error": "old password doesn't match existing password"});
    });
    // note that email and username are (or at leaset should be) identical. users.js checks the usernames for a matching email. 
    test("Rejects email change if another user is already using that email", async () => {
        //first creates a new user with username of "name2"
        await request
            .post(signupUrl)
            .set("Accept", "application/json")
            .send(newUser2);
        //Then attempts to change the email of newUser to name2
        const response = await request 
            .patch(emailUrl + name)
            .send(invalidEmailChange);
        expect(response.status).toBe(409);
        expect(response.body).toEqual({"error": "This email is already in use"});
    });

    test("Changes email if no user is using the email", async () => {
         const response = await request 
            .patch(emailUrl + name)
            .send(validEmailChange);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"message": "Updated the email of the user " + name + " to " + name3});
    });

    test("Succesfully deletes an existing user", async () => {
        const response = await request 
            .post(deleteUrl)
            .send({"username": name3});
        const response2 = await request 
            .post(deleteUrl)
            .send({"username": name2}); 

        expect(response.status).toBe(200); 
        expect(response.body).toEqual({"success": "user " + name3 + " deleted"});
        expect(response2.status).toBe(200); 
        expect(response2.body).toEqual({"success": "user " + name2 + " deleted"});
    });
})

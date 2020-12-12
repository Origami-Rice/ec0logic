const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const {
    remove_user
} = require('../dataAccess/userData');

const name = "test21";
const signupUrl = "/api/users/signup"
const deleteUrl = "/api/users/deleteuser"

/*afterAll(async () => {
    // remove the test user from the database
    return await remove_user(name);
});*/

const newUser = {
    "username": name,
    "password": "password",
    "email": "anEmail@gmail.com",
    "firstname": "firstName",
    "lastname": "lastname"
}

const invalidUser1 = {
    "username": "",
    "password": "password",
    "email": "anEmail@gmail.com",
    "firstname": "firstName",
    "lastname": "lastname"
}

const invalidUser2 = {
    "password": "password",
    "email": "anEmail@gmail.com",
    "firstname": "firstName",
    "lastname": "lastname"
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
        expect(response.body).toEqual({"error": "One of user's information fields is an invalid input"})
    });

    test("does not create user with missing fields", async () => {
        const response = await request
            .post(signupUrl)
            .set("Accept", "application/json")
            .send(invalidUser2);
        expect(response.status).toBe(422);
        expect(response.body).toEqual({"error": "One of user's information fields is an invalid input"})
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

describe("user deletion", () => {
    test("Succesfully deletes an existing user", async () => {
        const response = await request 
            .post(deleteUrl)
            .send({"username": name});
        expect(response.status).toBe(200); 
        expect(response.body).toEqual({"success": "user " + name + " deleted"});
    })
});
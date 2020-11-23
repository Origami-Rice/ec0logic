const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const {
    remove_user
} = require('../dataAccess/userData');

const name = "test";

afterAll(async () => {
    // remove the test user from the database
    return await remove_user(name);
});

describe("user creation", () => {
    test("save valid new user to database", async () => {
        // send post request
        const response = await request
            .post("/api/users/newuser")
            .set("Accept", "application/json")
            .send({
                username: name
            })
            // console.log(response);

            expect(response.status).toBe(200);
            // expect(response.statusCode).toBe(200); //not sure what the difference is?????????????????????????????????????????????????????????????????
            expect(response.body).toEqual({ success: "user " + name + " added" });
    });

    test("does not create user with no username", async () => {
        const response = await request
            .post("/api/users/newuser")
            .set("Accept", "application/json")
            .send({
            })
            expect(response.status).toBe(500);
            expect(response.body).toEqual({"error": "Internal server error"})
    });

    test("does not create user with blank username", async () => {
        const response = await request
            .post("/api/users/newuser")
            .set("Accept", "application/json")
            .send({
                "username": ""
            })
            expect(response.status).toBe(500);
            expect(response.body).toEqual({"error": "Internal server error"})
    });
});
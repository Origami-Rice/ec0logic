const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const {
    add_user, 
    remove_user
} = require('../dataAccess/userData');

const name = "foodlib_test_user";

const test_food_1 = {
    "name": "test_food_1",
    "days": 18 
};

// Setup and Teardown 
beforeAll(async () => {
    return await add_user(name);
});

afterAll(async () => {
    return await remove_user(name);
});

/////////////////////// Tests ///////////////////////
describe("access and update food library", () => {
    test("food library exists and isn't empty", async () => {
        url = "/api/food-library";
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).not.toEqual([]);
    });

    test("successfully added item to food-library", async () => {
        url = "/api/food-library";
        const response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(test_food_1);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "test_food_1 added with shelf life: 18 days"});
    });
    
}); 
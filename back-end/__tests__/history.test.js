///////////// TESTING THE HISTORY ENDPOINTS /////////////

const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const {
    add_user,
    remove_user
} = require('../dataAccess/userData');

/////////////////// Test Variables ///////////////////
const name = "history_test_user";
const invalidName = "invalid_history_test_user";
const today = new Date();
date = {"date": today.toISOString()};
const twoMonthsAgoDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
const twoWeeksAgoDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
const item1 = {
    "item": {
        "name": "Chocolate",
        "date": twoWeeksAgoDate.toISOString(),
        "quantity": 89,
        "unitsOfMeasure": "kg",
        "kilograms": "89.00"
    }
};
const item2 = { // will be added twice to wasted items history
    "item": {
        "name": "Banana",
        "date": twoMonthsAgoDate.toISOString(),
        "quantity": 5,
        "unitsOfMeasure": "lbs",
        "kilograms": "11.02"
    }
};

/////////////////// Setup and Teardown ///////////////////
beforeAll(async () => {
    // create a test user in the database
    return await add_user(name);
});

afterAll(async () => {
    // remove the test user from the database
    return await remove_user(name);
});

//////////////////////////// Tests ///////////////////////////
describe("access the wasted items history", () => {
    test("new user should have empty history", async () => {
        url = "/api/history/" + name;
        // send get request
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("add multiple items to wasted items list", async () => {
        url = "/api/history/" + name;
        // send post request to add item1
        let response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(item1);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Item was successfully added."});
        
        // send post request to add item2
        response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(item2);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Item was successfully added."});
    });

    test("items are returned sorted by most recent date", async () => {
        // send get request
        const response = await request.get(url);
        
        expect(response.status).toBe(200);
        // Check that item at index 0 has a more recent date than item
        // at index 1.
        let date0 = new Date(response.body[0].date);
        let date1 = new Date(response.body[1].date);
        expect(date0.getTime()).toBeGreaterThanOrEqual(date1.getTime());
    });

    test("successfully add item with duplicate name", async () => {
        url = "/api/history/" + name;
        // send post request to add item2
        response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(item2);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Item was successfully added."});
    });

    test("fail to access history of non-existing user", async () => {
        url = "/api/history/" + invalidName;
        // send get request
        const response = await request.get(url);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({"error": "Could not find user or no history of wasted items detected."});
    });
});

describe("filter wasted items", () => {
    test("get items wasted in the last week", async () => {
        url = "/api/history/weeks/" + name + "/1";
        // send get request
        const response = await request.get(url).send(date);

        expect(response.status).toBe(200);
        // there should be no items wasted in the last week based
        // on how the test variable were defined.
        expect(response.body).toEqual([]);
    });

    test("get items wasted in the last 3 weeks", async () => {
        url = "/api/history/weeks/" + name + "/3";
        // send get request
        const response = await request.get(url).send(date);

        expect(response.status).toBe(200);
        // there should be 1 item wasted in the last 3 week based
        // on how the test variables were defined
        expect(response.body).toEqual([item1.item]);
    });

    test("get items wasted in the last month", async () => {
        url = "/api/history/months/" + name + "/1";
        // send get request
        const response = await request.get(url).send(date);

        expect(response.status).toBe(200);
        // there should be 1 item wasted in the last month based
        // on how the test variables were defined
        expect(response.body).toEqual([item1.item]);
    });

    test("get items wasted in the last 3 month", async () => {
        url = "/api/history/months/" + name + "/3";
        // send get request
        const response = await request.get(url).send(date);

        expect(response.status).toBe(200);
        // there should be 3 items wasted in the last 3 months based
        // on how the test variables were defined and the fact that
        // an item was added twice in previous tests.
        expect(response.body).toEqual([item1.item, item2.item, item2.item]);
    });
}); 



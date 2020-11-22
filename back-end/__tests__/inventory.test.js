///////////// TESTING THE INVENTORY ENDPOINTS /////////////

const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);
const {
    add_user,
    remove_user
} = require('../dataAccess/userData');

/////////////////// Test Variables ///////////////////
const name = "inventory_test_user";
const date = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
const list = {
    "list": [
        {
            "name": "Chocolate",
            "expiryDate": "2020-09-17T04:34:58.887Z",
            "quantity": 89,
            "weight": 7
        },
        {
            "name": "Apple",
            "expiryDate": date.toISOString(),
            "quantity": 10,
            "weight": 1
        }
    ]
}
const expiring = [ // contains all items in list that soon expire
    {
        "name": "Apple",
        "expiryDate": date.toISOString(),
        "quantity": 10,
        "weight": 1
    }
];
const expired = [
    {
        "name": "Chocolate",
        "expiryDate": "2020-09-17T04:34:58.887Z",
        "quantity": 89,
        "weight": 7
    }
];

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
describe("access and update user's inventory", () => {
    test("new user should have empty inventory", async () => {
        // send get request
        url = "/api/inventory/" + name;
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("successfully add items to user's inventory", async () => {
        // send a post request
        url = "/api/inventory/" + name;
        const response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(list);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Inventory successfully updated."});
    });

    test("user's inventory is non-empty after update", async () => {
        // send a get request
        url = "/api/inventory/" + name;
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).not.toEqual([]);
    });

    test("user's inventory is sorted alphabetically by item name", async () => {
        url = "/api/inventory/" + name;
        // send a get request
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).not.toEqual(list);
        // the first item in the returned inventory list should be
        // the second item in the list variable
        expect(response.body[0]).toEqual(list.list[1]);
    });
});

describe("filter expired and expiring items", () => {
    test("retrieve single item that expires within the week", async () => {
        url = "/api/inventory/expiring/" + name;
        // send a get request
        const response = await request.get(url);
        
        expect(response.status).toBe(200);
        // Only one item in list variable is expiring so the GET request
        // should return this item
        expect(response.body).not.toEqual([]);
        expect(response.body).toEqual(expiring);
    });

    test("retrieve single item that already expired", async () => {
        url = "/api/inventory/expired/" + name;
        // send a get request
        const response = await request.get(url);

        expect(response.status).toBe(200);
        // Only one item in list variable has expired so the GET request
        // should return this item
        expect(response.body).not.toEqual([]);
        expect(response.body).toEqual(expired);
    });
});
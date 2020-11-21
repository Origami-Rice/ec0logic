const app = require('../server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const name = "test";

const {
    add_user, 
    remove_user
} = require('../dataAccess/userData');

const shoppingItem1 = {
    "item1": {
        "name": "Fish",
        "quantity": 2,
        "checked_off": false 
    }
}

const shoppingItem2 = {
    "item2": {
        "name": "Pizza",
        "quantity": 1,
        "checked_off": true 
    }
}

const shoppingList = {
    "shoppingList": [
        {
            "name": "Fish",
            "quantity": 2,
            "checked_off": false 
        },
        {
            "name": "Pizza",
            "quantity": 1,
            "checked_off": true 
        }
    ]
}

// Setup and Teardown 

beforeAll(async () => {
    return await add_user(name);
});

afterAll(async () => {
    return await remove_user(name);
});

/////////////////////// Tests ///////////////////////

describe("access and update shopping list", () => {
    test("new user shouldn't have a shopping list", async () => {
        url = "/api/shoppingList/" + name;
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test("successfully added item to user's shopping list", async () => {
        // send a post request
        url = "/api/shoppingList/" + name;
        const response = await request
            .post(url)
            .set("Accept", "application/json")
            .send(shoppingItem1);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Item was successfully added."});
    });

    test("created shopping list has correct contents", async () => {
        url = "/api/shoppingList/" + name;
        const response = await request.get(url);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([shoppingItem1]);
    });

    test("user's shopping list properly updates", async () => {
        url = "/api/inventory/" + name;
        const response = await request
            .put(url)
            .send([shoppingItem2]);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "Shopping list successfully updated."});
    }); 

    /*test("user's shopping list properly deletes", async () => {
        url = "/api/inventory/" + name; 
        const response = await request 
            .delete(url)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({"success": "item " + shoppingList + " deleted." });
    })*/
});

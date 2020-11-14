const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_inventorylist,
    add_item_to_inventorylist,
    remove_item_from_inventory,
    update_inventory_item
} = require('../dataAccess/userData');

router
    .route('/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/inventory/:username');
        console.log(request.params);
        // Decription: return all items in <username>'s inventory
        // TODO: implement
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        console.log(username);

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns to 
                console.log(result)

                // NO LONGER NEEDED SINCE ITEMS ARE SORTED AS THEY ARE ADDED ??????????????????????
                // // sort them in alphabetical order by the 'name' field
                // result.inventory_list.sort((a, b) => (a.name > b.name) ? 1 : -1);

                return response
                    .status(200)
                    .json(result.inventory_list);
            }else{
                return response.status(404).json({"error": "No inventory list detected."});
            }
        } catch (error) {
            console.log(error)
        }

    })
    .post(async (request, response) => {
        console.log('POST request to path /api/inventory/:username');
        // Description: Add a new item to <username>'s inventory
        // TODO 1: Define the structure of how you want data to be received
        //      (i.e. what fields are required in JSON object?)
        // We need an object that follows the InventoryItemSchema and
        // the name of the item must be capital.
        // TODO 2: Store the new item in the DB
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        console.log(username);
        // extract the item from the json object
        const item = request.body.item;
        console.log(item);
        
        try {
            const result = await add_item_to_inventorylist(username, item)
            if (result) { 
                console.log(result);
                return response
                    .status(200)
                    .json(result);
            }else{
                // this may not be the correct status code ???????????????????????????????????????????
                return response.status(404).json({"error": "Item could not be added."});
            }
        } catch (error) {
            console.log(error);
        }

    })

router
    .route('/:username/expiring')
    .get(async (request, response) => {
        console.log('GET request to path /api/inventory/:username/expiring');
        // Decription: return all items in <username>'s inventory that
        // expiring soon
        // TOOD: implement
        // --- Possibly get all the items in the user's inventory from DB
        // --- and then filter the ones that have expiry dates within one week

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        console.log(username);

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns to 
                console.log(result)
                const inventory = result.inventory_list;

                // get the date a week from now
                var nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                // find the items that will expire before nextWeek
                const expiring = []; 
                // Note that the expiryDate field must be an ISO 8601 string ?????????????????????????????????????????????
                for (let i = 0; i < inventory.length; i++) {
                    if(new Date(inventory[i]["expiryDate"]) < nextWeek) {
                        // add the item of format InventoryItemSchema in the inventory
                        // to a list of expiring items
                        expiring.push(inventory[i]);
                    }
                }

                // NO LONGER NEEDED SINCE ITEMS ARE SORTED ALREADY ??????????????????????
                // // sort them in alphabetical order by the 'name' field
                // expiring.sort((a, b) => (a.name > b.name) ? 1 : -1);

                return response
                    .status(200)
                    .json({expiringItems: expiring});
            }else{
                // This may be wrong
                return response.status(404).json({"error": "No inventory list detected."});
            }
        } catch (error) {
            console.log(error)
        }
    })

router
    .route('/:username/:itemName')
    .delete(async (request, response) => {
        console.log('POST request to path /api/inventory/:username/:itemName');
        // Description: delete the item in username's inventory specified by itemName
        // TODO: implement
        const username = request.params.username;
        const itemName = request.params.itemName;

        try {
            const result = await remove_item_from_inventory(username, itemName);
            if (result) {
                console.log(result)
                return response
                    .status(200)
                    .json({ success: "item " + itemName + " deleted." });
            }else{
                return response.status(404).json({"error": "No such item found in inventory."});
            }
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (request, response) => {
        console.log('PUT request to path /api/inventory/:username/:itemName');
        // Description: update the item in username's inventory specified by item
        // with the new data sent by client
        // TODO: implement
        
        const username = request.params.username;
        const itemName = request.params.itemName;

        // extract the item from the json object
        const item = request.body.item;
        const expiryDate = item["expiryDate"];
        const quantity = item["quantity"];
        const weight = item["weight"];

        try {
            const result = await update_inventory_item(username, itemName, expiryDate, quantity, weight);
            
            if (result) {
                return response
                    .status(200)
                    .json({ success: "item " + itemName + " updated."});
            }else{
                return response.status(404).json({"error": "No such item found in inventory."});
            }
        } catch (error) {
            console.log(error);
        }
    })


module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    add_item_to_inventorylist,
    check_if_item_in_inventory,
    get_inventorylist,
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

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns to 
                // console.log(result)
                
                // NO LONGER NEEDED ?????????????????????????????????????????
                // // sort them in alphabetical order by the 'name' field
                // result.inventory_list.sort((a, b) => (a.name > b.name) ? 1 : -1);

                return response
                    .status(200)
                    .json(result.inventory_list);
            }else{
                return response.status(404).json({"error": "No inventory list detected."});
            }
        } catch (error) {
            console.log(error);
        }

    })
    .post(async (request, response) => {
        console.log('POST request to path /api/inventory/:username');
        // Description: Add a new item to <username>'s inventory
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        // extract the item from the json object
        const item = request.body.item;
        // console.log(item);
        const itemName = item["name"];
        // console.log(itemName);

        // Check if the item is already in the user's inventory
        try {
            const exists = await check_if_item_in_inventory(username, itemName);
            if (exists) {
                return response
                .status(409)
                .json({error: "Item already exists in user's inventory."})
            }
        } catch (error) {
            console.log(error);
        }

        // The item does not exist in the user's inventory so we can add it
        try {
            const result = await add_item_to_inventorylist(username, item);
            if (result.result.nModified === 1) { 
                return response
                    .status(200)
                    .json({"success": "Item was successfully added."});
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

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns
                const inventory = result.inventory_list;

                // get the date a week from now
                let nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                // get the date today
                let today = new Date();
                // find the items that will expire before nextWeek
                const expiring = []; 
                // Note that the expiryDate field must be an ISO 8601 string ?????????????????????????????????????????????
                for (let i = 0; i < inventory.length; i++) {
                    let itemDate = new Date(inventory[i]["expiryDate"]);
                    if(today < itemDate && itemDate < nextWeek) {
                        // add the item of format InventoryItemSchema in the inventory
                        // to a list of expiring items
                        expiring.push(inventory[i]);
                    }
                }
                
                // Not needed if items are added properly
                // // sort them in alphabetical order by the 'name' field
                // expiring.sort((a, b) => (a.name > b.name) ? 1 : -1);

                return response
                    .status(200)
                    .json({expiring});
            }else{
                // This may be wrong
                return response
                    .status(404)
                    .json({"error": "No inventory list detected."});
            }
        } catch (error) {
            console.log(error);
        }
    })

router
    .route('/:username/expired')
    .get(async (request, response) => {
        console.log('GET request to path /api/inventory/:username/expired');
        // Decription: return all items in <username>'s inventory that
        // already expired

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns
                const inventory = result.inventory_list;

                // get today's date
                let today = new Date();
                // find the items that have already expired
                const expired = []; 
                // Note that the expiryDate field must be an ISO 8601 string ?????????????????????????????????????????????
                for (let i = 0; i < inventory.length; i++) {
                    if(new Date(inventory[i]["expiryDate"]) < today) {
                        // add the item of format InventoryItemSchema in the inventory
                        // to a list of expiring items
                        expired.push(inventory[i]);
                    }
                }

                return response
                    .status(200)
                    .json({expired});
            }else{
                // This may be wrong status code????
                return response
                    .status(404)
                    .json({"error": "No inventory list detected."});
            }
        } catch (error) {
            console.log(error);
        }
    })

router
    .route('/:username/:itemName')
    .get(async (request, response) => {
        console.log('GET request to path /api/inventory/:username/:itemName');
        // Description: check if item in username's inventory specified by itemName, exists
        const username = request.params.username;
        const itemName = request.params.itemName;

        // Check if the item is already in the user's inventory
        try {
            const exists = await check_if_item_in_inventory(username, itemName);
            // console.log(exists);
            if (exists) {
                return response
                .status(200) // not sure what status to return here ???????????????????
                .json({"message": "Item already exists in user's inventory."})
            } else {
                return response
                .status(404) // not sure what status to return here?/???????????????????????????
                .json({"message": "Item doesn't exist in user's inventory."})
            }
        } catch (error) {
            console.log(error);
        }
    })
    .delete(async (request, response) => {
        console.log('DELETE request to path /api/inventory/:username/:itemName');
        // Description: delete the item in username's inventory specified by itemName
        const username = request.params.username;
        const itemName = request.params.itemName;

        try {
            const result = await remove_item_from_inventory(username, itemName);
            if (result) {
                // console.log(result)
                return response
                    .status(200)
                    .json({"success": "item " + itemName + " deleted." });
            }else{
                return response
                .status(404)
                .json({"error": "No such item found in inventory."});
            }
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (request, response) => {
        console.log('PUT request to path /api/inventory/:username/:itemName');
        // Description: update the item in username's inventory specified by item
        // with the new data sent by client
        
        const username = request.params.username;
        const itemName = request.params.itemName;

        // extract the item from the json object
        const item = request.body.item;
        const expiryDate = item["expiryDate"];
        const quantity = item["quantity"];
        const weight = item["weight"];

        try {
            const result = await update_inventory_item(username, itemName, expiryDate, quantity, weight);
            
            // future note: check if result.result.nModified === 1 can be used
            if (result) {
                return response
                    .status(200)
                    .json({"success": "item " + itemName + " updated."});
            }else{
                return response
                .status(404)
                .json({"error": "No such item found in inventory."});
            }
        } catch (error) {
            console.log(error);
        }
    })


module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_inventorylist,
    update_inventorylist
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
                
                // NEEDED ?????????????????????????????????????????
                // sort them in alphabetical order by the 'name' field
                result.inventory_list.sort((a, b) => (a.name > b.name) ? 1 : -1);

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
        const list = request.body.list;

        // Update the inventory
        try {
            const result = await update_inventorylist(username, list);
            if (result.result.nModified === 1) { 
                return response
                    .status(200)
                    .json({"success": "Inventory successfully updated."});
            }else{
                // this may not be the correct status code ???????????????????????????????????????????
                return response.status(404).json({"error": "Inventory could not be updated."});
            }
        } catch (error) {
            console.log(error);
        }
    });

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
                
                // Needed ????????????????????????????????????????????????????????
                // sort them in alphabetical order by the 'name' field
                expiring.sort((a, b) => (a.name > b.name) ? 1 : -1);

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
    });

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

                // Needed ????????????????????????????????????????????????????????
                // sort them in alphabetical order by the 'name' field
                expired.sort((a, b) => (a.name > b.name) ? 1 : -1);

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
    });

module.exports = router;

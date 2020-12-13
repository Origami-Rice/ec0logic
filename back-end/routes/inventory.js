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
        // Decription: return all items in <username>'s inventory
        // TODO: implement
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                delete result._id; 
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
        // Description: Update user <username>'s inventory
        
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        // extract the item from the json object
        const list = request.body.list;

        // Update the inventory
        try {
            const result = await update_inventorylist(username, list);
            if (result.result.n === 1) { // a document has been found
                return response
                    .status(200)
                    .json({"success": "Inventory successfully updated."});
            }else{ // no matching document was found
                return response.status(404).json({"error": "Inventory could not be updated."});
            }
        } catch (error) {
            console.log(error);
        }
    });

router
    .route('/priority/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/inventory/priority/:username');
        // Decription: return all items in <username>'s inventory that are
        // expired or expiring soon

        // assign the username passed to the endpoint to a variable
        const username = request.params.username;

        // store the result of calling get_inventorylist()
        try {
            const result = await get_inventorylist(username);
            if(result && result.inventory_list){
                const inventory = result.inventory_list;

                // get the date a specified time from now
                let deadlineDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
                // find the items that expire before the 
                const priority = []; 
                // Note that the expiryDate field must be an ISO 8601 string 
                for (let i = 0; i < inventory.length; i++) {
                    let itemDate = new Date(inventory[i]["expiryDate"]);
                    if(itemDate < deadlineDate) {
                        // add the item of format InventoryItemSchema in the inventory
                        // to a list of priority items
                        priority.push(inventory[i]);
                    }
                }
                // sort items in order of oldest expiry date first
                priority.sort((a, b) => (new Date(a.expiryDate) > new Date(b.expiryDate)) ? 1 : -1);

                return response
                    .status(200)
                    .json(priority);
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

module.exports = router;

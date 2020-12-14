const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_shopping_list,
    add_item_to_shopping_list,
    remove_item_from_shopping_list,
    update_shopping_list,
    add_user
    
} = require('../dataAccess/userData')

router
    .route('/:username')
    // Route to /api/shoppinglist/:username
    .get(async (request, response) => {
        // This get request is to get the user's current shoppinglist
        console.log('GET request to path /api/shoppinglist/:username');
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        try{
            // calls endpoint function from userData.js
            const result = await get_shopping_list(username);
            
            if(result && result.shopping_list){
                
                return response
                    .status(200)
                    .json(result.shopping_list);
            }else{
                // if user does not exist, create new user
                try {
                    const user = await add_user(username);
                    const result2 = await get_shopping_list(username)
                    if (user) {
                        return response
                            .status(200)
                            .json(result2.shopping_list);
                    }
                    return response.status(500).json({ error: "Internal server error" });
                } catch (error) {
                    console.log(error)
                }
               
            }
        }catch (error) {
            console.log(error);

        }
    })
    // This post request is to add a new item the user's current shoppinglist
    .post(async (request, response) => {
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        // assign the item name passed to the endpoint to a variable
        const item = request.body;
        try{
            // calls endpoint function from userData.js
            const result = await add_item_to_shopping_list(username, item);
            if (result){
                return response
                    .status(200)
                    .json({"success": "Item was successfully added."});

            }else{
                return response
                    .status(404)
                    .json({"error": "Item could not be added to history."});

            }
            
        }catch (error) {
            console.log(error);
        }
    })
    // This put request is to replace the user's old shoppinglist with a new one.
    .put(async (request, response) => {
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        // gets the newlist from input
        const newList = request.body;
        
        try{
            // calls endpoint function from userData.js
            const result = await update_shopping_list(username, newList);
            if (result){
                return response 
                    .status(200)
                    .json({"success": "Shopping list successfully updated."})
            }else{
                return response
                    .status(404)
                    .json({"error": "Shopping list could not be updated."});
            }
        }catch (error) {
            console.log(error)
        }
    })
router
    .route('/:username/:item')
    .delete(async (request, response) => {
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        // gets the item from the parameter
        const item = request.params.item;
        
        try{ 
            const result = await remove_item_from_shopping_list(username, item)
            if (result) {
                return response
                    .status(200)
                    .json({"success": "item " + item + " deleted." });
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


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_shopping_list,
    add_item_to_shopping_list,
    remove_item_from_shopping_list,
    
} = require('../dataAccess/userData')

router
    .route('/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/shoppinglist/:username');
        
        const username = request.params.username;
        try{
            const result = await get_shopping_list(username);
            if(result && result.shopping_list){
                
                return response
                    .status(200)
                    .json(result.shopping_list);
            }else{
                return response.status(404).json({"error": "No shopping list detected."});
            }
        }catch (error) {
            console.log(error);

        }
    })
    .post(async (request, response) => {
        const username = request.params.username;
        const item = request.body;
         // console.log(item)
        try{
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
router
    .route('/:username/:item')
    .delete(async (request, response) => {
        const username = request.params.username;
        const item = request.params.item
        console.log(item)
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
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    get_common_food,
    add_common_food,
    remove_common_food
} = require('../dataAccess/foodlibData');


router
    .route('/')
    .get(async (request, response) => {
        console.log('GET request to path /api/food-library');
        // Description: Return all the foods in our library of
        // "common food" items. Include their name and approximate
        // shelf life in days, months, or years.

        try {
            const commonfoods = await get_common_food();
            if(commonfoods){
                const data = commonfoods.map(item=> {
                    delete item._id;
                    return item;
                });

                return response
                    .status(200)
                    .json(data);
            }else{
                return response.status(404).json({"error": "can't retrieve from food library."});
            }
        } catch (error) {
            console.log(error);
        }
    })
    .post(async (request, response) => {
        console.log('POST request to path /api/food-library');
        // Description: Add a new item to the library.
        // This item will have a name and shelf life passed in.

        //Json must include name(String) and days(Number)
        const name = request.body.name;
        const days = request.body.days;
        try {
            const item = await add_common_food(name, days);
            if (item) {
                return response
                    .status(200)
                    .json({ success: name + " added with shelf life: " + days +" days"});
            }
            return response.status(404).json({"error": "Error: couldn't add common food" });
        } catch (error) {
            console.log(error)
        }
    })
router
    .route('/remove/:name')
    .delete(async (request, response) => {
        console.log('DELETE request to path /api/food-library/remove');
        // Description: Delete the specified common food item from
        // the database.

        // assign the parameter name to a variable
        const food_name = request.params.name;
        try {
            const result = await remove_common_food(food_name);
            if(result){
                return response
                    .status(200)
                    .json({success: "Successfully deleted item from food library"});
            }else{
                return response.status(404).json({"error": "can't delete from food library."});
            }
        } catch (error) {
            console.log(error);
        }
    });
    
module.exports = router;
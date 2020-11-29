const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    get_common_food,
    add_common_food
} = require('../dataAccess/foodlibData');


router
    .route('/')
    .get(async (request, response) => {
        console.log('GET request to path /api/food-library');
        // TODO: Return all the foods in our library of "common food" items
        // Include their name and approximate shelf life in days, months, or years

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
        // TODO: Add a new item to the library
        // This item will have a name and shelf life passed in

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
            return response.status(404).json({ error: "Error: Adding common food" });
        } catch (error) {
            console.log(error)
        }
    }); 

module.exports = router;

/* GET JSON FORMAT
[
    {
        "_id": "5fb5e75927ec92703a44ce06",
        "name": "Apple",
        "days": 4
    },
    {
        "_id": "5fb5e77527ec92703a44ce07",
        "name": "Pear",
        "days": 3
    },
    {
        "_id": "5fb5e78b27ec92703a44ce08",
        "name": "Chocolate",
        "days": 5
    }
]
*/


/* POST JSON
When making a post request, make sure to send over two key-values in the body

{"name" : "nameofobject", "days": 5}


*/
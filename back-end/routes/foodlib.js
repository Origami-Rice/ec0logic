const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
    get_common_food,
    add_common_food
} = require('../dataAccess/userData')


router
    .route('/')
    .get(async (request, response) => {
        console.log('GET request to path /api/food-library');
        // console.log(request.params)
        // TODO: Return all the foods in our library of "common food" items
        // Include their name and approximate shelf life in days, months, or years

        try {
            const commonfoods = await get_common_food();
            console.log
            if(commonfoods){
                return response
                    .status(200)
                    .json(commonfoods);
            }else{
                return response.status(404).json({"error": "can't retrieve from food library."});
            }
        } catch (error) {
            console.log(error);
        }
    })
    .post(async (request, response) => {
        console.log('POST request to path /api/food-library');
        console.log(request.params);
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

// router
//     .route('/:name/:days')
//     .post(async (request, response) => {
//         console.log('POST request to path /api/food-library');
//         console.log(request.params);
//         // TODO: Add a new item to the library
//         // This item will have a name and shelf life passed in

//         //Json must include name(String) and days(Number)
//         const name = request.params.name;
//         const days = request.params.days;
//         // console.log(name);
//         // console.log(days);
//         console.log(request.body);
//         console.log(request.body.name);
//         console.log(request.body.days);
//         // console.log(request.params);
//         // console.log(request.json);
//         // console.log(request);
//         try {
//             const item = await add_common_food(name, days);
//             if (item) {
//                 return response
//                     .status(200)
//                     .json({ success: name + " added with shelf life: " + days +" days"});
//             }
//             return response.status(404).json({ error: "Error: Adding common food" });
//         } catch (error) {
//             console.log(error)
//         }
//     }); 
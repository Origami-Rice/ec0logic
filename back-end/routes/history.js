const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const {
    get_entire_history,
    add_item_to_wasted_history
} = require('../dataAccess/userData');


const LBS_PER_KG = 2.20462262185;
const G_PER_KG = 1000; 
/**
 * Calculates the weight of a single item to 2 decimal places based on the item's quantity and 
 * units of measure. Returns 0 if item's unitOfMeasure isn't equal to "g", "kg", or "lbs" (case-
 * insensitive equality)
 */
function calculateKilograms(item){
    var kilograms = item.quantity; 
    var units = String(item.unitsOfMeasure);
    if (units.toUpperCase() == "LBS"){  
        kilograms = kilograms * LBS_PER_KG;   
    } else if (units.toUpperCase() == "G"){
        kilograms = kilograms / G_PER_KG;
    } else if (!(units.toUpperCase() == "KG")){
        kilograms = 0; 
    }
    return (Math.round(kilograms * 100) / 100).toFixed(2); 
}

router
    .route('/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/history/:username');
        // Description: Return the user's entire history of wasted items

        // extract the username from the route
        const username = request.params.username;

        // request the user's history
        try {
            const history = await get_entire_history(username);
            if (history && history.wasted_items) { // find out if this will still be true if the list is empty
                // items should be sorted by date with the most recent at index 0
                return response
                    .status(200)
                    .json(history.wasted_items);
            } else {
                return response
                    .status(404)
                    .json({"error": "No history of wasted item detected."});
            }
        } catch (error) {
            console.log(error);
        }
    })
    .post(async (request, response) => {
        console.log('POST request to path /api/history/:username');
        // Description: Add a new item to the user's history of wasted items
        
        // extract the username from the route
        const username = request.params.username;
        // extract the item from the request
        const item = request.body.item;
        // console.log(item);

        // try to add the item to the wasted items list
        try {
            var weight = calculateKilograms(item);  
            item["kilograms"] = weight;             
            const result = await add_item_to_wasted_history(username, item);

            if (result) {
                return response
                    .status(200)
                    .json({"success": "Item was successfully added."});
            } else {
                return response
                    .status(404)
                    .json({"error": "Item could not be added to history."});
            }
        } catch (error) {
            console.log(error);
        }
    })

router
    .route('/weeks/:username/:numWeeks')
    .get(async (request, response) => {
        console.log('GET request to path /api/history/weeks/:username/:numWeeks');
        // Description: Return the user's history of wasted items during the
        // requested last few weeks.

        // extract the username and the weeks from the route
        const username = request.params.username;
        const numWeeks = request.params.numWeeks;

        // extract the provided current date, should be an ISO 8601
        // string or any other form that is accepted by Date.
        const endDate = new Date(request.body.date);

        // Calculate the date numWeeks before date
        const days = numWeeks * 7;
        const beginDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
        console.log(beginDate);
        
        // get the user's history
        try {
            const result = await get_entire_history(username);
            if (result && result.wasted_items) { // find out if this will still be true if the list is empty
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns
                // items should be sorted by date with the most recent at index 0
                const history = result.wasted_items;
                // find the items in the specified range
                const filtered = [];

                // loop through all the dates
                for (let i = 0; i < history.length; i++) {
                    let dateWasted = new Date(history[i]["date"]);
                    console.log(dateWasted);
                    if (dateWasted < beginDate) {
                        // since items are sorted by most recent date, no other items
                        // will be within the desired range.
                        break;
                    } else {
                        filtered.push(history[i]);
                    }
                }
                
                return response
                    .status(200)
                    .json(filtered);
            } else {
                return response
                    .status(404)
                    .json({"error": "Could not find user or history of wasted items detected."});
            }
        } catch (error) {
            console.log(error);
        }
    })

router
    .route('/months/:username/:numMonths')
    .get(async (request, response) => {
        console.log('GET request to path /api/history/months/:username/:numMonths');
        // Description: Return the user's history of wasted items during the
        // requested last few months.

        // extract the username and the months from the route
        const username = request.params.username;
        const numMonths = request.params.numMonths;

        // extract the provided current date, should be an ISO 8601
        // string or any other form that is accepted by Date.
        const endDate = new Date(request.body.date);

        // Calculate the date numMonths before date
        const days = numMonths * 30;   
        const beginDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
        console.log(beginDate);
        
        // get the user's history
        try {
            const result = await get_entire_history(username);
            if (result && result.wasted_items) { // find out if this will still be true if the list is empty
                delete result._id; // im guessing this deletes the id field that mongodb automatically assigns
                // items should be sorted by date with the most recent at index 0
                const history = result.wasted_items;
                // find the items in the specified range
                const filtered = [];

                // loop through all the dates
                for (let i = 0; i < history.length; i++) {
                    let dateWasted = new Date(history[i]["date"]);
                    console.log("date wasted");
                    console.log(dateWasted);
                    if (dateWasted < beginDate) {
                        // since items are sorted by most recent date, no other items
                        // will be within the desired range
                        break;
                    } else {
                        filtered.push(history[i]);
                    }
                }
                
                return response
                    .status(200)
                    .json(filtered);
            } else {
                return response
                    .status(404)
                    .json({"error": "Could not find user or history of wasted items detected."});
            }
        } catch (error) {
            console.log(error);
        }
    })

module.exports = router;
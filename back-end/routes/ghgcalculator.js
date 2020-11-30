const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const CO2_KG_PER_FOOD_KG = 1.9;
const LBS_PER_KG = 2.20462262185; // 1 kg = 2.20462262185 lbs
const G_PER_KG = 1000; 
const {
    get_inventorylist,
    get_shopping_list,
    get_entire_history
} = require('../dataAccess/userData');

function calculateCO2(foodList){   
    var totalWeightInKg = 0; 
    var listLength = foodList.length; 
    for (var i = 0; i < listLength; i++){
        var units = String(foodList[i].unitsOfMeasure);
        if(typeof foodList[i].weight != "undefined" && typeof foodList[i].unitsOfMeasure ==
        "string"){
            var newItemCO2 = foodList[i].quantity * foodList[i].weight;    
            if (units.toUpperCase() == "LBS"){  
                newItemCO2 = newItemCO2 / LBS_PER_KG;   
            } else if (units.toUpperCase() == "G"){
                newItemCO2 = newItemCO2 / G_PER_KG;
            } else if (!units.toUpperCase() == "KG"){
                newItemCO2 = 0; 
            }
            totalWeightInKg += newItemCO2; 
        }
    }
    return (Math.round(totalWeightInKg * CO2_KG_PER_FOOD_KG * 1000) / 1000).toFixed(3); 
}

/***
 * Not yet imlemented
 */
function calculateFoodWasteCO2(wastedItemsList){
    return; 
}

router
    .route('/inventory/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/ghgcalculator/inventory/:username');
        console.log(request.params);
        
        const username = request.params.username;
        try {
            const result = await get_inventorylist(username);
            if (result && result.inventory_list){
                c02_kgs = calculateCO2(result.inventory_list)
                return response
                    .status(200)
                    .json(c02_kgs);
            } else {
                return response.status(404).json({"error": "GHG of inventory couldn't be calculated"}); 
            }
        } catch (error) {
            console.log(error); 
        }
    }); 

router
    .route('/shoppingList/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/ghgcalculator/shoppingList/:username');
        console.log(request.params);
        
        const username = request.params.username;
        try {
            const result = await get_shopping_list(username);
            if (result && result.shopping_list){
                c02_kgs = calculateCO2(result.shopping_list)
                return response
                    .status(200)
                    .json(c02_kgs);
            } else {
                return response.status(404).json({"error": "GHG of shopping list couldn't be calculated"}); 
            }
        } catch (error) {
            console.log(error); 
        }
    }); 
module.exports = router;
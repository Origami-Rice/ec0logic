const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const CO2_KG_PER_FOOD_KG = 1.9;
const LBS_PER_KG = 2.20462262185; // 1 kg = 2.20462262185 lbs
const {
    get_inventorylist,
    get_shopping_list,
    get_entire_history
} = require('../dataAccess/userData');

function getInventoryCO2(inventoryList){
    var co2 = 0; 
    var listLength = inventoryList.length; 
    for (var i = 0; i < listLength; i++){
        var newItemCO2 = inventoryList[i].quantity * inventoryList[i].weight;
        var units = String(inventoryList[i].unitsOfMeasure)
        if (units.toUpperCase() == "LBS"){
            newItemCO2 = newItemCO2 / LBS_PER_KG;   
        }
        co2 += newItemCO2; 
    }
    return co2 * CO2_KG_PER_FOOD_KG; 
}

router
    .route('/inventory/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/ghg-calculator/inventory/:username');
        console.log(request.params);
        
        const username = request.params.username;
        try {
            const result = await get_inventorylist(username);
            if (result && result.inventory_list){
                c02_kgs = getInventoryCO2(result.inventory_list)
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
module.exports = router;

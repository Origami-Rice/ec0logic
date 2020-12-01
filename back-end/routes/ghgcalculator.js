const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const CO2_KG_PER_FOOD_KG = 1.9;
const LBS_PER_KG = 2.20462262185; // 1 kg = 2.20462262185 lbs
const G_PER_KG = 1000; 
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"]; 
const {
    get_inventorylist,
    get_shopping_list,
    get_entire_history
} = require('../dataAccess/userData');

/** 
 * Calculates ghg of a list of inventory or food items. Uses the old format where items have 
 * a weight attribute and quantity refers to the number of the item. 
 */
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

/**
 * Takes in float and returns it rounded to 3 decimals. 
 */
function roundToThreeDecimals(number){
    return (Math.round(number * 1000) / 1000).toFixed(3); 
}

/***
 * Calculates GHG of items in wastedItems between the startDate and endDate 
 */
function calculateFoodWasteCO2(wastedItems, startDate, endDate){
    var totalWeightInKg = 0; 
    var listLength = wastedItems.length; 
    for (var i = 0; i < listLength; i++){
        var expiredDate = new Date(wastedItems[i]["date"]); 
        console.log(wastedItems[i]["name"]);
        console.log(expiredDate >= startDate && expiredDate <= endDate);
        if (expiredDate >= startDate && expiredDate <= endDate){
            totalWeightInKg = totalWeightInKg + parseFloat(wastedItems[i].kilograms); 
        }
    }
    return roundToThreeDecimals(totalWeightInKg * CO2_KG_PER_FOOD_KG); 
}

/**
 * Returns array of the ghg for this month and the last five months in the format 
 * [{"month": string, "lbs": number, "kg": number}, ...]
 */
function getGHGBreakdown(wastedItems){
    var breakdown = []; 
    var end = new Date();
    var start = new Date(end.getFullYear(), end.getMonth(), 1); 
    var co2; var year; var month; var newMonthBreakdown; 
    for (var i = 0; i < 6; i++){
        co2 = calculateFoodWasteCO2(wastedItems, start, end);
        year = start.getFullYear(); 
        month = start.getMonth();  
        newMonthBreakdown = {
            "month": String(MONTHS[month]),
            "lbs": roundToThreeDecimals(parseFloat(co2) * LBS_PER_KG),
            "kg": co2 
        }
        breakdown.push(newMonthBreakdown); 
        if (month == 0){
            year = year - 1; 
        } 
        month = (month + 11) % 12; 
        end = new Date(start - 1); 
        start = new Date(year, month, 1);
    }
    return breakdown; 
}

router  //currently not being used 
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

router  //currently not being used 
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
    
router
    .route('/history/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/ghgcalculator/history/:username');
        console.log(request.params);
        
        const username = request.params.username;
        try {
            const result = await get_entire_history(username);
            if (result && result.wasted_items){
                var start = new Date(request.body.start);
                var end = new Date(request.body.end); 
                console.log(start); 
                console.log(end); 
                c02_kgs = calculateFoodWasteCO2(result.wasted_items, start, end);
                return response
                    .status(200)
                    .json({"emissions": {"kg": parseFloat(c02_kgs), "lbs": roundToThreeDecimals
                        (parseFloat(c02_kgs) * LBS_PER_KG) }});
            } else {
                return response.status(404).json({"error": "Couldn't find wasted items to calculate the GHG"}); 
            }
        } catch (error) {
            console.log(error); 
        }
    }); 

router 
    .route('/history/breakdown/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/ghgcalculator/history/breakdown/:username');
        console.log(request.params); 

        const username = request.params.username; 
        const result = await get_entire_history(username);
        try {
            if (result && result.wasted_items){
                var ghgBreakdown = getGHGBreakdown(result.wasted_items);
                return response
                    .status(200)
                    .json(ghgBreakdown);
            } else {
                return response.status(404).json({"error": "Couldn't find wasted items to calculate 6" + 
                    "month GHG breakdown"});
            }
        } catch (error){
            console.log(error); 
        }
    })

module.exports = router;

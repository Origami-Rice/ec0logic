const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const CO2_KG_PER_FOOD_KG = 1.9;     //1 kg food = 1.9 kg CO2
const LBS_PER_KG = 2.20462262185;   // 1 kg = 2.20462262185 lbs
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"]; 
const {
    get_entire_history
} = require('../dataAccess/userData');

/**
 * Takes in float and returns it rounded to 3 decimals. 
 * @param {number} number The number to round 
 * @return {number} number rounded to 3 decimal places 
 */
function roundToThreeDecimals(number){
    return (Math.round(number * 1000) / 1000).toFixed(3); 
}

/***
 * Calculates GHG total of all items wasted between startDate and endDate
 * @param wastedItems The list of wasted item objects 
 * @param startDate A Date object representing the date to start looking from
 * @param endDate A Date object representing the date to finishing looking 
 * @return {number} The total kg of CO2 produced rounded to 3 decimal places 
 */
function calculateFoodWasteCO2(wastedItems, startDate, endDate){
    var totalWeightInKg = 0; 
    var listLength = wastedItems.length; 
    // Iterates through each item in the list 
    for (var i = 0; i < listLength; i++){
        var expiredDate = new Date(wastedItems[i]["date"]);                 //retrieves the date the item was wasted 
        console.log(wastedItems[i]["name"]);                                //for debugging
        console.log(expiredDate >= startDate && expiredDate <= endDate);    //for debugging 
        //checks if the expiry date is inside the time period 
        if (expiredDate >= startDate && expiredDate <= endDate){
            totalWeightInKg = totalWeightInKg + parseFloat(wastedItems[i].kilograms); 
        }
    }
    return roundToThreeDecimals(totalWeightInKg * CO2_KG_PER_FOOD_KG); 
}

/**
 * Gets a breakdown of the GHG produced in the last 6 months, including the current month. 
 * 
 * @param wastedItems A list of the wasted items 
 * @returns A json object with a list of the names of the last 6 months, an list for the kg of CO2 in each month, and 
 * a list for the lbs of CO2 in each month. The indices in the kg and lbs lists belong to the month whose name is in the same index
 * in the months list. The months are listed in chronological order. 
 */
function getGHGBreakdown(wastedItems){
    var months = []; var lbs = []; var kg = []; 
    var end = new Date();
    var start = new Date(end.getFullYear(), end.getMonth(), 1); 
    var co2; var year; var month; 
    // Loops for last six months 
    for (var i = 0; i < 6; i++){
        //Calculate the food waste in the current time period 
        co2 = calculateFoodWasteCO2(wastedItems, start, end);
        year = start.getFullYear(); 
        month = start.getMonth();

        //Push the month name, the lbs amount, and the kg amount, to their corresponding lists 
        months.push(String(MONTHS[month]));
        lbs.push(parseFloat(roundToThreeDecimals(parseFloat(co2) * LBS_PER_KG)));
        kg.push(parseFloat(co2)); 

        //If it's january, must go back to the previous year 
        if (month == 0){
            year = year - 1; 
        } 
        //Calculates the previous month. For Date object, months go from 0 to 11. The month before 0 is month 11 of the previous year. 
        month = (month + 11) % 12; 
        //the new end of the time period is the last millisecond of the previous month 
        end = new Date(start - 1); 
        //create the new start of the time period with the correct year and month
        start = new Date(year, month, 1);
    }
    return {"months": months.reverse(), "kg": kg.reverse(), "lbs": lbs.reverse()}; 
}
    
router
    .route('/history/:username')
    .post(async (request, response) => {
        console.log('POST request to path /api/ghgcalculator/history/:username');
        console.log(request.params);

        //Returns the total amount of GHG produced in the requested time frame 
        
        const username = request.params.username;
        try {
            const result = await get_entire_history(username);
            //checks if the user's history exists 
            if (result && result.wasted_items){
                //retrieves start and end date ISO strings and stores them as Date objects 
                var start = new Date(request.body.start);
                var end = new Date(request.body.end); 
                console.log(start);         
                console.log(end);           

                //Calculate food wasted in the time period 
                c02_kgs = calculateFoodWasteCO2(result.wasted_items, start, end);

                //returns a json object in the format {"emissions": {"kg": kg of CO2}, {"lbs", lbs of CO2}}
                return response
                    .status(200)
                    .json({"emissions": {"kg": parseFloat(c02_kgs), "lbs": roundToThreeDecimals
                        (parseFloat(c02_kgs) * LBS_PER_KG) }});
            } else {    //if history was unable to be retrieved, it 404s 
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

        //Retrieves a six month breakdown of the user's GHG produced 

        const username = request.params.username; 
        const result = await get_entire_history(username);
        try {  
            //Checks if user's history exists 
            if (result && result.wasted_items){
                //compute and return the 6 month breakdown 
                var ghgBreakdown = getGHGBreakdown(result.wasted_items);
                return response
                    .status(200)
                    .json(ghgBreakdown);
            } else {    //Case where the wasted items history couldn't be retrieved. 
                return response.status(404).json({"error": "Couldn't find wasted items to calculate 6" + 
                    "month GHG breakdown"});
            }
        } catch (error){
            console.log(error); 
        }
    })

module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const fetch = require("node-fetch");


const api_key = "1beca095b4c44b54b6861b16e89a2f63";

// const {
//     _functions
// } = require('../dataAccess/userData');

router
    .route('/')
    .get(async (request, res) => {
        console.log('GET request to path /api/recipe');
        const query = request.body.query;
        const diet = request.body.diet;
        const intolerances = request.body.intolerances;
        // Log body variables
        console.log(query);
        console.log(diet);
        console.log(intolerances);

        const url = new URL("https://api.spoonacular.com/recipes/search")
        const parameters = {apiKey: api_key, query: query, diet: diet, intolerances:intolerances, number: 20, sort: "popularity"};
        Object.keys(parameters).forEach(param => url.searchParams.append(param, parameters[param]));


        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send("500: Internal Server Error");
        });


    })
module.exports = router;


/*
GET REQUEST:

/api/recipe 
with following JSON body variables: 'query', 'diet', 'intolerances'
Note: 'intolerances' is a list of strings.
If you dont have any preferences for diet/intolerances, substitute with ""

{
    'query': 'beef'
    'diet': 'vegetarian'                //or ""
    'intolerances': ['peanut', 'gluten']     //or ""
}

*/

// EMPTY DIET/INTOLERANCES QUERY EXAMPLES
//{"query": "Pasta", "diet": "", "intolerances": ""}
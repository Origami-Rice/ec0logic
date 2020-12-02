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
    .route('/search')
    .get(async (request, res) => {
        console.log('GET request to path /api/recipe/search');
        const query = request.body.query;
        const diet = request.body.diet;
        const intolerances = request.body.intolerances;
        // Log body variables
        console.log(query);
        console.log(diet);
        console.log(intolerances);

        const url = new URL("https://api.spoonacular.com/recipes/search");
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

router
    .route('/:id/ingredients')
    .get(async (request, res) => {
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/ingredientWidget.json`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("500: Internal Server Error");
        });
    });

router
    .route('/:id/information')
    .get(async (request, res) => {
    console.log('path /recipe/');
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/information?includeNutrition=false`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("500: Internal Server Error");
        });
    });

router
    .route('/:id/analyzedInstructions')
    .get(async (request, res) => {
    console.log('path /recipe/');
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/analyzedInstructions`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("500: Internal Server Error");
        });
    });
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




/* Returned response format: 
e.g., search {"query": "Pasta", "diet": "", "intolerances": ""}
returned:

{
    "results": [
        {
            "id": 535835,
            "title": "Spaghetti Carbonara",
            "readyInMinutes": 25,
            "servings": 4,
            "sourceUrl": "http://DAMNDELICIOUS.NET/2014/03/29/spaghetti-carbonara/",
            "openLicense": 0,
            "image": "Spaghetti-Carbonara-535835.jpg"
        },
        {
            "id": 249325,
            "title": "Chili Tortellini",
            "readyInMinutes": 45,
            "servings": 10,
            "sourceUrl": "http://picky-palate.com/2013/04/10/chili-tortellini/",
            "openLicense": 0,
            "image": "Chili-Tortellini-249325.jpg"
        }
    ],
    "baseUri": "https://spoonacular.com/recipeImages/",
    "offset": 0,
    "number": 20,
    "totalResults": 839,
    "processingTimeMs": 584,
    "expires": 1607126693519,
    "isStale": false
}
*/
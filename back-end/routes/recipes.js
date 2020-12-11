const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const fetch = require("node-fetch");


const api_key = "df34cd7a9a35436caa66b3c8e81457fe";

const {
    get_saved_recipes, add_recipe_to_saved_recipes
} = require('../dataAccess/userData');

router
    .route('/search')
    .post(async (request, response) => {
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
            response.status(200).send(data);
        })
        .catch((error) => {
            console.log(error)
            response.status(500).send("500: Internal Server Error");
        });


    })

router
    .route('/:id/ingredients')
    .get(async (request, response) => {
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/ingredientWidget.json`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            response.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send("500: Internal Server Error");
        });
    });

router
    .route('/:id/information')
    .get(async (request, response) => {
    console.log('path /recipe/');
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/information?includeNutrition=false`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            response.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send("500: Internal Server Error");
        });
    });

router
    .route('/:id/analyzedInstructions')
    .get(async (request, response) => {
    console.log('path /recipe/');
    console.log(request.params);
    const url = new URL(`https://api.spoonacular.com/recipes/${request.params.id}/analyzedInstructions`);
    url.searchParams.append("apiKey", api_key);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            response.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send("500: Internal Server Error");
        });
    });


router
    .route('/:username')
    .get(async (request, response) => {
        console.log('GET request to path /api/recipe/:username');
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        try{
            const result = await get_saved_recipes(username);
            console.log(result)
            if(result && result.saved_recipes){
                return response
                    .status(200)
                    .json(result.saved_recipes);
            }else{
                return response.status(500).json({ error: "Internal server error" });
            }
        }catch (error) {
                console.log(error);
            }
        })
        .post(async (request, response) => {
            // assign the username passed to the endpoint to a variable
            const username = request.params.username;
            
            const recipe = request.body;
            try{
                const result = await add_recipe_to_saved_recipes(username, recipe);
                if (result){
                    return response
                        .status(200)
                        .json({"success": "Recipe was successfully added."});
    
                }else{
                    return response
                        .status(404)
                        .json({"error": "Item could not be added to history."});
    
                }
                
            }catch (error) {
                console.log(error);
            }
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
EMPTY DIET/INTOLERANCES QUERY EXAMPLE:
{"query": "Pasta", "diet": "", "intolerances": ""}
*/

/* Returned response format for /search: 
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
        }
    ],
    "baseUri": "https://spoonacular.com/recipeImages/",
    "offset": 0,
    "number": 1,
    "totalResults": 839,
    "processingTimeMs": 584,
    "expires": 1607126693519,
    "isStale": false
}
*/

/* Returned format for /:id/ingredients
{
    "ingredients": [
        {
            "name": "diced bacon",
            "image": "raw-bacon.png",
            "amount": {
                "metric": {
                    "value": 4,
                    "unit": "slice"
                },
                "us": {
                    "value": 4,
                    "unit": "slice"
                }
            }
        },
        {
            "name": "eggs",
            "image": "egg.png",
            "amount": {
                "metric": {
                    "value": 2,
                    "unit": "large"
                },
                "us": {
                    "value": 2,
                    "unit": "large"
                }
            }
        }
    ]
}
*/

/* Returned from /:id/information
essentially returns a huge dictionary of information including directions,ingredients,diet/intolerance info, wine pairing, cuisine, etc.
*/

/* Returned from /:id/analyzedInstructions
[
    {
        "steps": [
            {
                "number": 1,
                "step": "In a large pot of boiling salted water, cook pasta according to package instructions",
                "ingredients": [
                    {
                        "id": 1033,
                        "name": "parmesan",
                        "localizedName": "parmesan",
                        "image": "parmesan.jpg"
                    },
                    {
                        "id": 20420,
                        "name": "pasta",
                        "localizedName": "pasta",
                        "image": "fusilli.jpg"
                    }
                ],
                "equipment": [
                    {
                        "id": 404661,
                        "name": "whisk",
                        "localizedName": "whisk",
                        "image": "whisk.png"
                    }
                ]
            },
            etc
        ]
    }
]
*/
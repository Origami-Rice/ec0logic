const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const fetch = require("node-fetch");


const api_key = "df34cd7a9a35436caa66b3c8e81457fe";
const baseImageSource = "https://spoonacular.com/recipeImages/";

const {
    get_saved_recipes, 
    add_recipe_to_saved_recipes, 
    remove_recipe_from_saved_recipes
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
                    .json({"results": result.saved_recipes, "baseUri": baseImageSource});
            }else{
                return response.status(500).json({ error: "Internal server error" });
            }
        }catch (error) {
                console.log(error);
            }
        })
    .post(async (request, response) => {
        console.log('POST request to path /api/recipe/:username');
        // assign the username passed to the endpoint to a variable
        const username = request.params.username;
        const recipe = request.body;
        // console.log(recipe);
        if (!("id" in recipe)) { //no id in body
            return response
                    .status(404)
                    .json({"error": "Item is missing id."});
        }
        try{
            const result = await add_recipe_to_saved_recipes(username, recipe);
            if (result) {
                return response
                    .status(200)
                    .json({"success": "Recipe was successfully added."});

            }else{
                return response
                    .status(404)
                    .json({"error": "Item could not be added to saved recipes."});

            }
            
        } catch (error) {
            console.log(error);
        }
    });

router
    .route('/:username/:recipe')
    .delete(async (request, response) => {
        console.log('GET request to path for deleting recipe');
        // delete recipe in user's saved recipes list
        const username = request.params.username;
        const recipeid = Number(request.params.recipe);
        console.log(recipeid);  //Note that it's a number and not a string in the database
        try{
            const result = await remove_recipe_from_saved_recipes(username, recipeid);
            if(result){
                return response
                .status(200)
                .json({"success": "Recipe was successfully deleted."});
            }else{
                return response.status(500).json({ error: "error occurred when deleting recipe" });
            }
        }catch (error) {
                console.log(error);
            }
        })
module.exports = router;
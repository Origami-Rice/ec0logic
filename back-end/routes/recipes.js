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
        // Uses spoonacular api to search for recipes with the following ingridients, diet type and intolerances
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
    // Given a spoonacular recipe id, return ingridients involved
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
        // Given a spoonacular recipe id, return the recipe's information
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
    // Given a spoonacular recipe id, return cooking steps
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
        // return user's saved recipes
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
        // add a new recipe to user's list of saved recipes
        const username = request.params.username;
        const recipe = request.body;
        if (!("id" in recipe)) { //no id in body: cancel operation
            return response
                    .status(404)
                    .json({"error": "Item is missing id."});
        }
        const saved_recipes = await get_saved_recipes(username);
        var duplicate = false;
        saved_recipes.saved_recipes.map(item=> {
            if (recipe.id == item.id){
                duplicate = true;
            }
            return item;
        });
        if (duplicate == true){
            return response
            .status(404)
            .json({"error": "Recipe is already saved. Invalid"});
        }else{
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
        }
    });

router
    .route('/:username/:recipe')
    .delete(async (request, response) => {
        console.log('GET request to path for deleting recipe');
        // delete recipe in user's saved recipes list
        const username = request.params.username;
        const recipeid = Number(request.params.recipe);
        console.log(recipeid);
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
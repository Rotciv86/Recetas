const RecipesRecipes = require('../model/collections/recipesRecipes');
const { recipesRecipes } = require('../model/index');

const getRecipesRecipes = (request, response) => {
    try {
        recipesRecipes.getAll().then(data => {
            response.status(200).send(data[0]);
        }).catch(error => response.status(400).send(error));
    } catch (error) {
        response.status(500).send({ msg: 'internal server error' });
    }
}

const createRecipeRecipes = async (request, response) => {
    console.log("Request body:", request.body);

    try {
        const { name, ingredients, steps } = request.body;
        const image = request.file ? request.file.path : null


        // Validación básica de entrada
        if (!name || !Array.isArray(ingredients) || !Array.isArray(steps)) {
            return response.status(400).send({ msg: 'Invalid input data' });
        }

        // Validar ingredientes
        if (ingredients.some(ingredient => !ingredient.name || ingredient.amount === undefined)) {
            return response.status(400).send({ msg: 'Invalid ingredient data' });
        }

        // Validar pasos
        if (steps.some(step => !step.description || step.step_number === undefined)) {
            return response.status(400).send({ msg: 'Invalid step data' });
        }

        const recipe = new RecipesRecipes(name, image, ingredients, steps);

        const result = await recipe.create();
        response.status(201).send({ recipeId: result.recipeId, msg: "Recipe created" });
    } catch (error) {
        console.error(error); // Imprime el error para depuración
        response.status(500).send({ msg: 'internal server error' });
    }
}


const getOneRecipeRecipes = async (request, response) => {
    try {
        const { id } = request.params;

        const recipe = await RecipesRecipes.getById(id);
        if (recipe) {
            response.status(200).send(recipe);
        } else {
            response.status(404).send({ msg: 'Recipe not found' });
        }
    } catch (error) {
        response.status(500).send({ msg: 'internal server error' });
    }
}

const deleteRecipeRecipes = async (request, response) => {
    try {
        const { id } = request.params;
        await recipesRecipes.deleteReferences(id)
        const result = await recipesRecipes.getById(id);

        const recipeToDelete = result[0][0];

        if (recipeToDelete) {
            recipesRecipes.delete(id).then(data => response.status(200).send({ data, msg: 'recipe deleted' })).catch(error => response.status(400).send(error));
        } else {
            response.status(404).send({ msg: 'recipe not found' });
        }
    } catch (error) {
        response.status(500).send({ msg: 'internal server error' });
    }
}

const updateRecipeRecipes = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, ingredients, steps } = request.body;

        const ingredientsArray = ingredients; // [{name, amount}]
        const stepsArray = steps; // [{description, step_number}]

        const result = await recipesRecipes.getById(id);

        const recipeToUpdate = result[0][0];

        if (recipeToUpdate) {
            const updatedRecipe = new RecipesRecipes(name, null, ingredientsArray, stepsArray);

            await updatedRecipe.update(id);

            // Handle ingredients and steps update logic as needed here

            response.status(200).send({ msg: 'recipe updated' });
        } else {
            response.status(404).send({ msg: 'recipe not found' });
        }
    } catch (error) {
        response.status(500).send({ msg: 'internal server error' });
    }
}

module.exports = { getRecipesRecipes, createRecipeRecipes, getOneRecipeRecipes, deleteRecipeRecipes, updateRecipeRecipes };

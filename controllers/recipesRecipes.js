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
        
        await recipesRecipes.deleteReferences(id);
        
        const recipe = await recipesRecipes.getById(id);
        
        if (recipe) {
            await recipesRecipes.delete(id);
            response.status(200).send({ msg: 'Recipe deleted' });
        } else {
            response.status(404).send({ msg: 'Recipe not found' });
        }
    } catch (error) {
        console.error(`Error deleting recipe: ${error.message}`);
        response.status(500).send({ msg: 'Internal server error', error: error.message });
    }
}


const updateRecipeRecipes = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, image_path, ingredients, steps } = request.body;

        // Validar entrada básica
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

        const recipe = await RecipesRecipes.getById(id);
        if (!recipe) {
            return response.status(404).send({ msg: 'Recipe not found' });
        }

        const updatedRecipe = new RecipesRecipes(name, image_path, ingredients, steps);
        await updatedRecipe.update(id);

        response.status(200).send({ msg: 'Recipe updated' });
    } catch (error) {
        response.status(500).send({ msg: 'internal server error' });
    }
};


module.exports = { getRecipesRecipes, createRecipeRecipes, getOneRecipeRecipes, deleteRecipeRecipes, updateRecipeRecipes };

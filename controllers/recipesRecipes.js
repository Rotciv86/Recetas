const { response } = require('express')
const RecipesRecipes = require('../model/collections/recipesRecipes')
const { recipesRecipes } = require('../model/index')

const getRecipesRecipes = (request, response) => {

    try {
        recipesRecipes.getAll().then(data => {
            response.status(200).send(data[0])
        }).catch(error => response.status(400).send(error))
    } catch (error) {
        response.status(500).send({msg: 'internal server error'})
    }
}

const createRecipeRecipes = (request, response) => {
    try {
        const { name, description, preparation_time, difficulty } = request.body
        const recipe = new RecipesRecipes(name, description, preparation_time, difficulty)

        recipe.create()
        .then(data => response.status(201).send({data, msg: "Recipe created"}))
        .catch(error => response.status(400).send(error))

    } catch (error) {
        response.status(500).send({msg: 'internal server error'})
    }
}

const getOneRecipeRecipes = (request, response) => {
    try {
        const { id } = request.params

        recipesRecipes.getById(id).then(data => {
            response.status(200).send(data[0])
        }).catch(error => response.status(400).send(error))
    } catch (error) {
        response.status(500).send({msg: 'internal server error'})

    }
}

const deleteRecipeRecipes = async (request, response) => {
    try {
        const { id } = request.params
        const result = await recipesRecipes.getById(id)

        const recipeToDelete = result[0][0]


        if(recipeToDelete){
            recipesRecipes.delete(id).then(data => response.status(200).send({data, msg: 'recipe deleted'})).catch(error => response.status(400).send(error))
        } else {
            response.status(404).send({msg: 'recipe not found'})
        }
        
    } catch (error) {
        response.status(500).send({msg: 'internal server error'})

    }
}

const updateRecipeRecipes = async (request, response) => {
    try {
        const {id} = request.params
        const { name, description, preparation_time, difficulty } = request.body

        const result = await recipesRecipes.getById(id)

        const recipeToDelete = result[0][0]

        if (recipeToDelete) {

            const updatedRecipe = new RecipesRecipes(name, description, preparation_time, difficulty)

            updatedRecipe.update(id).then(data => response.status(200).send({data, msg: 'recipe updated'})).catch(error => response.status(400).send(error))
    

        } else {
            response.status(404).send({msg: 'recipe not found'})

        }

    } catch (error) {
        response.status(500).send({msg: 'internal server error'})

    }


}

module.exports = { getRecipesRecipes, createRecipeRecipes, getOneRecipeRecipes, deleteRecipeRecipes, updateRecipeRecipes}
const express = require('express')
const router = express.Router()
const { getRecipesRecipes, createRecipeRecipes, getOneRecipeRecipes, deleteRecipeRecipes, updateRecipeRecipes } = require('../controllers/recipesRecipes')
const { validatorCreateRecipe } = require('../validators/recipesRecipes')

router.get('/', getRecipesRecipes)

router.post('/', validatorCreateRecipe, createRecipeRecipes)

router.get('/:id', getOneRecipeRecipes)

router.delete('/:id', deleteRecipeRecipes)

router.put('/:id', validatorCreateRecipe, updateRecipeRecipes)

module.exports = router
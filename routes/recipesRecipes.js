const express = require('express')
const router = express.Router()
const { getRecipesRecipes, createRecipeRecipes, getOneRecipeRecipes, deleteRecipeRecipes, updateRecipeRecipes } = require('../controllers/recipesRecipes')
const { validatorCreateRecipe } = require('../validators/recipesRecipes')

const upload = require('../utils/multerConfig')

router.get('/', getRecipesRecipes)

router.post('/', upload.single('image'), createRecipeRecipes)

router.get('/:id', getOneRecipeRecipes)

router.delete('/:id', deleteRecipeRecipes)

router.put('/:id', validatorCreateRecipe, updateRecipeRecipes)

module.exports = router
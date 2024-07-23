<template>
    <div>
        <!-- <button @click="getRecipes" class="bg-indigo-600 hover:bg-indigo-300 text-white rounded-xl border border-indigo-950 p-4">Get Recipes</button> -->
        <ul class="grid grid-cols-3 gap-8">
          <li v-for="recipe in recipes" :key="recipe.recipe_id">
            <div @click="sendToggleFeaturedEmisor(recipe.recipe_id)" class="p-8 flex flex-col justify-between gap-8 w-[100%] h-[100%] rounded-xl bg-slate-100 shadow-2xl border-2 border-purple-300 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
              <h3 class="text-emerald-700 font-extrabold text-xl">{{recipe.name}}</h3>
              <img :src="getImageUrl(recipe.image_path)" alt="Recipe Image" class="w-full h-40 object-cover mt-4">
              <button @click="deleteRecipe(recipe.recipe_id)" class="flex justify-center items-center rounded-lg w-8 h-8 p-2  border-red-950 bg-red-600 text-white font-extrabold hover:bg-red-400">X</button>
            </div>
          </li>
        </ul>
      </div>
</template>
<script>
import  eventBus  from '../eventBus.js'

export default {
    name: "RecipesList",
    data() {
        return {
            recipes : [],
            isVisibleFeatured: false
        }
    },
    async mounted() {
        await this.getRecipes()
    },
    methods: {
    async getRecipes() {
      try {
        const response = await fetch('http://localhost:3000/api/recipes-recipes')

        const data = await response.json()
        console.log(data)
        this.recipes = data

      } catch (error) {
        console.error(error)
      }

    },
    getImageUrl(path) {
      return `http://localhost:3000/${path}`
    },
    async deleteRecipe(id) {
      try {

      const response =  await fetch(`http://localhost:3000/api/recipes-recipes/${id}`,
         {
          method: 'DELETE',
          headers: { "Content-Type": "Application/json" },
        }
      );

      const data = await response.json()

      console.log(data)

        this.getRecipes()

      } catch (error) {
        console.error(error)
      }
    },
    sendToggleFeaturedEmisor(recipeId) {
        eventBus.emit("sendedToggleFeaturedSignal", !this.isVisibleFeatured);
        eventBus.emit("sendedRecipeInfo", recipeId);  
 
    }

  }
}
</script>

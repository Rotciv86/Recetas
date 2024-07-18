<template>
  <div>
    <h1 class="text-indigo-600 text-8xl">Helloooooo  world!!</h1>
    <button @click="getRecipes" class="bg-indigo-600 hover:bg-indigo-300 text-white rounded-xl border border-indigo-950 p-4">Get Recipes</button>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <h3>{{recipe.name}}</h3>
        <p>{{recipe.description}}</p>
        <p>{{recipe.preparation_time}}</p>
        <p>{{recipe.difficulty}}</p>

      </li>
    </ul>
    <RouterView/>
  </div>
</template>
<script>
export default {
  name : "App",
  data() {
    return {
      recipes : []
    }
  },
  methods: {
    async getRecipes() {
      try {
        const response = await fetch('http://localhost:3000/api/recipes-recipes')

        const data = await response.json()
        this.recipes = data

      } catch (error) {
        console.error(error)
      }


    }
  }
}
</script>
<style>
  
</style>
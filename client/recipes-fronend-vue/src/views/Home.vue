<template>
    <div>
        <Featured @click="removeFeatured" v-if="isVisibleFeatured" @close="clearSelectedRecipe"/>
        <RecipesList/>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import RecipesList from '../components/RecipesList.vue'
import Featured from '../components/Featured.vue'
import eventBus from '../eventBus'

export default {
    name : "Home",
    components : { Navbar, RecipesList, Featured },
    data() {
        return {
            selectedRecipeData: null,
            isVisibleFeatured: false,

        }
    },
    mounted() {
        eventBus.on('sendedRecipeInfo', this.handleRecipeData);
        eventBus.on('sendedToggleFeaturedSignal', this.setToggleFeatured);
    },
    beforeUnmount() {
        eventBus.off('sendedRecipeInfo', this.handleRecipeData);
        eventBus.off('sendedToggleFeaturedSignal', this.setToggleFeatured);
    },

    methods: {

        setToggleFeatured(toogle) {
        this.isVisibleFeatured = toogle
        },
        removeFeatured(){
        this.isVisibleFeatured = !this.isVisibleFeatured
        },
        async handleRecipeData(recipeId) {
        try {
            const response = await fetch(`http://localhost:3000/api/recipes-recipes/${recipeId}`);
            const data = await response.json();
            this.selectedRecipeData = data;
            eventBus.emit('recipeSingleDataFetched', data);
        } catch (error) {
            console.error(error);
        }
    },
        clearSelectedRecipe() {
            this.selectedRecipeData = null
        }
    }
}
</script>

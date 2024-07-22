<template>
    <div>
        <RecipesList/>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import RecipesList from '../components/RecipesList.vue'

export default {
    name : "Home",
    components : { Navbar, RecipesList },
    data() {
        return {
            viewName: "Home"
        }
    },
}
</script>

<template>
  <div class="p-8 background">
    <Navbar/>
    <RouterView/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'

export default {
  name : "App",
  components: {
    Navbar
  },
  data() {
    return {
      componentName : "App"
    }
  },

}
</script>
<style scoped>
.background {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0)), url('./assets/pexels-solareflares-2751755.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
}
</style>
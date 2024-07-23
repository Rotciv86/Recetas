<template>
    <nav class="pb-8 flex flex-row justify-between">
        <h1 class="text-indigo-600 text-8xl pb-8">Be Cook</h1>

        <ul>
          <li>
            <RouterLink to="/" class="text-indigo-600">Recetas</RouterLink>
          </li>
          <li>
            <RouterLink to="/form" class="text-indigo-600">Añade nueva receta</RouterLink>
          </li>
        </ul>
      </nav>
</template>
<script>
export default {
name: "Navbar"
}
</script>
<style>

</style>
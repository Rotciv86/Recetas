<template>
    <div>
        <h1><span>{{ viewName }}: </span> Bon dia y feliç solstici d'estiu</h1>
        <p>
          <strong>Current route path:</strong> {{ $route.fullPath }}
        </p>    
    </div>
</template>
<script>

export default {
    name : "Home",
    data() {
        return {
            viewName: "Home"
        }
    },
}
</script>
<style>
span {
    color: red;
  }
</style>
<template>
    <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="addRecipe" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-6 text-emerald-500">Crear Nueva Receta</h2>
  
        <!-- Nombre -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
            Nombre
          </label>
          <input
            v-model="form.nombre"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre de la receta"
            required
          />
        </div>
  
        <!-- Descripción -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion">
            Descripción
          </label>
          <textarea
            v-model="form.descripcion"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descripcion"
            placeholder="Descripción de la receta"
            rows="4"
            required
          ></textarea>
        </div>
  
        <!-- Dificultad -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="dificultad">
            Dificultad
          </label>
          <select
            v-model="form.dificultad"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dificultad"
            required
          >
            <option value="">Selecciona la dificultad</option>
            <option value="Easy">Fácil</option>
            <option value="Intermediate">Intermedia</option>
            <option value="Difficult">Difícil</option>
          </select>
        </div>
  
        <!-- Tiempo de preparación -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="tiempo">
            Tiempo de Preparación
          </label>
          <input
            v-model="form.tiempo_preparacion"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tiempo"
            type="text"
            placeholder="Tiempo estimado en minutos"
            required
          />
        </div>
  
        <!-- Botón de Envío -->
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear Receta
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          nombre: '',
          descripcion: '',
          dificultad: '',
          tiempo_preparacion: ''
        }
      };
    },
    methods: {
      async addRecipe() {
        const newRecipe = {
            name : this.form.nombre,
            description : this.form.descripcion,
            preparation_time : this.form.tiempo_preparacion,
            difficulty : this.form.dificultad
        }

        try {

            const response = await fetch("http://localhost:3000/api/recipes-recipes/", {
            method: "POST",
            headers: {"Content-Type" : "Application/json"},
            body: JSON.stringify(newRecipe)
        })

            const data = await response.json()


        } catch (error) {
            console.error(error)
        }


      }
    }
  };
  </script>
  
  
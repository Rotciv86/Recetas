<template>
  <div class="max-w-md mx-auto mt-8">
    <form @submit.prevent="addRecipe" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data">
      <h2 class="text-2xl font-bold mb-6 text-emerald-500">Crear Nueva Receta</h2>

      <!-- Nombre -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre</label>
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
        <label class="block text-gray-700 text-sm font-bold mb-2" for="descripcion">Descripción</label>
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
        <label class="block text-gray-700 text-sm font-bold mb-2" for="dificultad">Dificultad</label>
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
        <label class="block text-gray-700 text-sm font-bold mb-2" for="tiempo">Tiempo de Preparación</label>
        <input
          v-model="form.tiempo_preparacion"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tiempo"
          type="text"
          placeholder="Tiempo estimado en minutos"
          required
        />
      </div>

      <!-- Ingredientes -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Ingredientes</label>
        <div v-for="(ingredient, index) in form.ingredientes" :key="index" class="mb-4">
          <input
            v-model="ingredient.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Ingrediente"
          />
          <input
            v-model="ingredient.amount"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Cantidad"
          />
          <button type="button" @click="removeIngredient(index)" class="text-red-500">Eliminar</button>
        </div>
        <button type="button" @click="addIngredient" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Ingrediente</button>
      </div>

      <!-- Pasos -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Pasos</label>
        <div v-for="(step, index) in form.pasos" :key="index" class="mb-4">
          <textarea
            v-model="step.description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="Descripción del paso"
          ></textarea>
          <button type="button" @click="removeStep(index)" class="text-red-500">Eliminar</button>
        </div>
        <button type="button" @click="addStep" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Paso</button>
      </div>

      <!-- Imagen -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="imagen">Imagen</label>
        <input
          @change="handleImageUpload"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="imagen"
          type="file"
          accept="image/*"
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
        tiempo_preparacion: '',
        ingredientes: [{ name: '', amount: '' }],
        pasos: [{ description: '' }],
        image: null
      }
    };
  },
  methods: {
    addIngredient() {
      this.form.ingredientes.push({ name: '', amount: '' });
    },
    removeIngredient(index) {
      this.form.ingredientes.splice(index, 1);
    },
    addStep() {
      this.form.pasos.push({ description: '' });
    },
    removeStep(index) {
      this.form.pasos.splice(index, 1);
    },
    handleImageUpload(event) {
      this.form.image = event.target.files[0];
    },
    async addRecipe() {
      const formData = new FormData();
      formData.append('name', this.form.nombre);
      formData.append('description', this.form.descripcion);
      formData.append('preparation_time', this.form.tiempo_preparacion);
      formData.append('difficulty', this.form.dificultad);
      formData.append('image', this.form.image);
      this.form.ingredientes.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient.name);
        formData.append(`ingredients[${index}][amount]`, ingredient.amount);
      });
      this.form.pasos.forEach((step, index) => {
        formData.append(`steps[${index}][description]`, step.description);
        formData.append(`steps[${index}][step_number]`, index + 1);
      });

      try {
        const response = await fetch("http://localhost:3000/api/recipes-recipes/", {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>

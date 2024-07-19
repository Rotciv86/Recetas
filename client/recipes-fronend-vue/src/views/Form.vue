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

      <!-- Ingredientes -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Ingredientes</label>
        <div v-for="(ingredient, index) in form.ingredientes" :key="index" class="mb-4">
          <input
            v-model="ingredient.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Ingrediente"
            required
          />
          <input
            v-model="ingredient.amount"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Cantidad"
            required
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
            required
          ></textarea>
          <input
            v-model.number="step.step_number"
            type="number"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            placeholder="Número del paso"
            required
            min="1"
            :max="form.pasos.length + 1"
            :value="index + 1"
          />
          <button type="button" @click="removeStep(index)" class="text-red-500 mt-2">Eliminar</button>
        </div>
        <button type="button" @click="addStep" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar Paso</button>
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Imagen</label>
        <input
          type="file"
          @change="handleFileUpload"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        ingredientes: [{ name: '', amount: '' }],
        pasos: [{ description: '', step_number: 1 }],
        image: null
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.image = event.target.files[0];
    },
    addIngredient() {
      this.form.ingredientes.push({ name: '', amount: '' });
    },
    removeIngredient(index) {
      this.form.ingredientes.splice(index, 1);
    },
    addStep() {
      const nextStepNumber = this.form.pasos.length + 1;
      this.form.pasos.push({ description: '', step_number: nextStepNumber });
    },
    removeStep(index) {
      this.form.pasos.splice(index, 1);
      this.updateStepNumbers();
    },
    updateStepNumbers() {
      this.form.pasos.forEach((step, index) => {
        step.step_number = index + 1;
      });
    },
    async addRecipe() {
  // Crear un objeto FormData
  const formData = new FormData();

  // Agregar los datos del formulario
  formData.append('name', this.form.nombre);
  this.form.ingredientes.forEach((ingredient, index) => {
    formData.append(`ingredients[${index}][name]`, ingredient.name);
    formData.append(`ingredients[${index}][amount]`, ingredient.amount);
  });
  this.form.pasos.forEach((step, index) => {
    formData.append(`steps[${index}][description]`, step.description);
    formData.append(`steps[${index}][step_number]`, step.step_number);
  });

  // Agregar la imagen si existe
  if (this.form.image) {
    formData.append('image', this.form.image);
  }

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

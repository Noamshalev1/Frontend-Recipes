<template>
  <b-modal v-model="showModal" title="Create New Recipe" @hide="onModalClose">
    <b-form @submit.prevent="createRecipe">
      <b-form-group label="Recipe Title:">
        <b-form-input v-model="recipe.title" required></b-form-input>
      </b-form-group>
      <b-form-group label="Summary:">
        <b-form-textarea v-model="recipe.summary" rows="3" required></b-form-textarea>
      </b-form-group>
      <b-form-group label="Preparation Time (in minutes):">
        <b-form-input type="number" v-model="recipe.readyInMinutes" required></b-form-input>
      </b-form-group>
      <b-form-group label="Number of Servings:">
        <b-form-input type="number" v-model="recipe.servings" required></b-form-input>
      </b-form-group>
      <b-form-group label="Ingredients:">
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="mb-3">
          <b-input-group>
            <b-form-input v-model="ingredient.name" placeholder="Ingredient name" style="width: 140px;" required></b-form-input>
            <b-form-input type="number" v-model="ingredient.amount" placeholder="Amount" style="width: 50px;" required></b-form-input>
            <b-form-select v-model="ingredient.unit" :options="units" style="width: 50px;" required></b-form-select>
            <b-button variant="danger" @click="removeIngredient(index)">Remove</b-button>
          </b-input-group>
        </div>
        <b-button @click="addIngredient">Add Ingredient</b-button>
      </b-form-group>
      <b-form-group label="Instructions:">
        <b-form-textarea v-model="recipe.instructions" rows="5" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary" @clicl="createRecipe">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: 
    ['showModal'],
  data() {
    return {
      recipe: {
        title: '',
        summary: '',
        readyInMinutes: 0,
        servings: 1,
        ingredients: [
          { name: '', amount: null, unit: 'tsp' }
        ],
        instructions: ''
      },
      units: ['tsp', 'Tbsp', 'cup', 'ml', 'l', 'g', 'kg', 'pinches', 'servings', 'cloves', 'ounces'] // Example units
    };
  },
  mounted() {
    this.loadRecipes();
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ name: '', amount: null, unit: 'tsp' });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    createRecipe() {
  // Check if there are stored recipes in localStorage
      let storedRecipes = localStorage.getItem('myRecipes');
      // Parse the stored recipes or initialize an empty array if null
      let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      // Add the new recipe to the array
      recipes.push(this.recipe);
      // Save the updated recipes array back to localStorage
      localStorage.setItem('myRecipes', JSON.stringify(recipes));
      // Emit the event to notify that the recipe has been saved
      this.$emit('recipe-saved');
      // Hide the modal
      this.showModal = false;
      // Reset the recipe form
      this.resetRecipe();
    },
    onModalClose() {
      this.$emit('hide'); // Make sure this emits after the modal is set to close
    },
    resetRecipe() {
      this.recipe = {
        title: '',
        summary: '',
        readyInMinutes: 0,
        servings: 1,
        ingredients: [
          { name: '', amount: null, unit: 'tsp' }
        ],
        instructions: ''
      };
    },
  }
};
</script>

<style scoped>

</style>

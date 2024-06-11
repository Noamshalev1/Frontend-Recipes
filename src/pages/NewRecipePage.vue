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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ['showModal'],
  data() {
    return {
      recipe: {
        id: null,
        title: '',
        summary: '',
        readyInMinutes: 0,
        servings: 1,
        ingredients: [
          { name: '', amount: null, unit: 'tsp' }
        ],
        instructions: '',
      },
      units: ['tsp', 'Tbsp', 'cup', 'ml', 'l', 'g', 'kg', 'pinches', 'servings', 'cloves', 'ounces']
    };
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({ name: '', amount: null, unit: 'tsp' });
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    createRecipe() {
      this.recipe.id = Date.now(); // Generate a unique ID
      let storedRecipes = localStorage.getItem('myRecipes');
      let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      
      // Transform ingredients to match Spoonacular's format
      const ingredients = this.recipe.ingredients.map(ingredient => ({
        name: ingredient.name,
        amount: {
          metric: {
            value: ingredient.amount,
            unit: ingredient.unit
          },
          us: {
            value: ingredient.amount, // Assuming the same for simplicity
            unit: ingredient.unit
          }
        }
      }));
      
      // Construct the recipe object in Spoonacular format
      const newRecipe = {
        id: this.recipe.id,
        title: this.recipe.title,
        summary: this.recipe.summary,
        readyInMinutes: this.recipe.readyInMinutes,
        servings: this.recipe.servings,
        ingredients: ingredients,
        instructions: this.recipe.instructions,
        image: this.recipe.image,
        analyzedInstructions: [
          {
            name: "",
            steps: this.recipe.instructions.split('\n').map((instruction, index) => ({
              number: index + 1,
              step: instruction,
              ingredients: [],
              equipment: []
            }))
          }
        ]
      };

      recipes.push(newRecipe);
      localStorage.setItem('myRecipes', JSON.stringify(recipes));
      this.$emit('recipe-saved');
      this.showModal = false;
      this.resetRecipe();
    },
    onModalClose() {
      this.$emit('hide');
    },
    resetRecipe() {
      this.recipe = {
        id: null,
        title: '',
        summary: '',
        readyInMinutes: 0,
        servings: 1,
        ingredients: [
          { name: '', amount: null, unit: 'tsp' }
        ],
        instructions: '',
      
      };
    }
  }
};
</script>

<style scoped>
</style>

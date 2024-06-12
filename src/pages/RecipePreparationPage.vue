<template>
    <div class="container mt-5">
      <div v-if="recipe">
        <div class="text-center mb-4">
          <h1 class="display-4">{{ recipe.title }}</h1>
          <img :src="recipe.image|| defaultImage" alt="Recipe Image" class="img-fluid rounded recipe-image" />
        </div>
        <div class="row">
          <div class="col-md-6 mb-4">
            <h2 class="h4">Ingredients</h2>
            <ul class="list-group">
              <li class="list-group-item" v-for="ingredient in multipliedIngredients" :key="ingredient.id">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
              </li>
            </ul>
            <b-button variant="primary" class="mt-3" @click="multiplyIngredients">Double Ingredients</b-button>
          </div>
          <div class="col-md-6 mb-4" v-if="recipe.instructions && recipe.instructions.length">
            <h2 class="h4">Preparation Steps</h2>
            <ul class="list-group">
              <li class="list-group-item" v-for="(step, index) in recipe.instructions" :key="index">
                <b-form-checkbox v-model="stepCompleted[index]" @change="saveProgress">
                  {{ step }}
                </b-form-checkbox>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import familyrecipes from "../assets/mocks/familyrecipes.json";
  export default {
    name: "recipeprep",
    data() {
      return {
        recipe: null,
        multipliedIngredients: [],
        stepCompleted: [],
        defaultImage: require('@/assets/myrecipes.png')
      };
    },
    methods: {
      getImageUrl(image) {
        try {
          return require(`@/assets/${image}`);
        } catch (e) {
          console.error(`Image not found: ${image}`);
          return '';
        }
      },
      async fetchRecipe() {
        const recipeId = this.$route.params.id;
        const collection = this.$route.query.collection;
        let data;
        let localRecipes = [];
        let localRecipe = [];

        // family recipe
        if (collection === 'family') {
          localRecipes = familyrecipes || "[]";
          localRecipe = localRecipes.find(r => r.id === recipeId);
          data = localRecipe;
          this.recipe = {
          id: data.id,
          title: data.title,
          image: this.getImageUrl(data.image[0]),
          ingredients: data.ingredients,
          preparation: data.preparation,
        };
        this.multipliedIngredients = this.recipe.ingredients;

        // myrecipes recipe
        } else if (collection === 'myrecipes') {
          localRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
          localRecipe = localRecipes.find(r => r.id === recipeId);
          data = localRecipe;

          let ingredients = [];

      // Process each ingredient in the array
        data.ingredients.forEach(ingredient => {
          ingredients.push({
            name: ingredient.name,
            amount: ingredient.amount.metric.value,
            unit: ingredient.amount.metric.unit,
          });
        });
          
          this.recipe = {
          id: data.id,
          title: data.title,
          ingredients: ingredients,
          instructions: data.analyzedInstructions && data.analyzedInstructions[0]
            ? data.analyzedInstructions[0].steps.map(step => step.step)
            : [] // Default to an empty array if instructions are undefined
        };
          this.multipliedIngredients = [...this.recipe.ingredients];
        }

        //from api
        else{
          localRecipe = localRecipes.find(r => r.id === recipeId);
          const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=709325a1a8844ca3ab65110a4d2e4b90`);
          data = await response.json();

          this.recipe = {
          id: data.id,
          title: data.title,
          image: data.image,
          ingredients: data.extendedIngredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitShort
          })),
          instructions: data.analyzedInstructions[0]?.steps.map(step => step.step) || []
        };
        this.multipliedIngredients = [...this.recipe.ingredients];
        this.loadProgress();
        } 
      },
      multiplyIngredients() {
        this.multipliedIngredients = this.multipliedIngredients.map(ingredient => ({
          ...ingredient,
          amount: ingredient.amount * 2
        }));
      },
      saveProgress() {
        localStorage.setItem(`recipeProgress-${this.recipe.id}`, JSON.stringify(this.stepCompleted));
      },
      loadProgress() {
        const savedProgress = localStorage.getItem(`recipeProgress-${this.recipe.id}`);
        if (savedProgress) {
          this.stepCompleted = JSON.parse(savedProgress);
        } else {
          this.stepCompleted = Array(this.recipe.instructions.length).fill(false);
        }
      },
      logout() {
        // Implement the logout logic and clear the progress
        localStorage.removeItem(`recipeProgress-${this.recipe.id}`);
        this.stepCompleted = Array(this.recipe.instructions.length).fill(false);
      }
    },
    mounted() {
      this.fetchRecipe();
    }
  };
  </script>
  
  <style scoped>
  .recipe-image {
    width: 400px; /* Set a specific width */
    height: 300px; /* Set a specific height */
    object-fit: cover; /* Ensures the image covers the specified dimensions while maintaining aspect ratio */
  }
  </style>
  
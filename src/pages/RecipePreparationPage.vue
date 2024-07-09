<template>
    <div class="container mt-5">
      <div v-if="recipe">
        <div class="text-center mb-4">
          <h1 class="display-4">{{ recipe.title }}</h1>
          <img :src="recipe.image|| defaultImage" alt="Recipe Image" class="img-fluid rounded recipe-image" />
        </div>
        <div v-if="recipe.instructions && recipe.instructions.length > 0" class="text-center mt-3">
            <h5>Progress label</h5>
            <b-progress :value="progress" :max="max_len" :precision="2"></b-progress>
            <span>{{ progress }}/{{max_len}}</span>
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
  import axios from "axios";
  export default {
    name: "recipeprep",
    data() {
      return {
        recipe: null,
        multipliedIngredients: [],
        stepCompleted: [],
        defaultImage: require('@/assets/myrecipes.png'),
        progress: 0,
        max_len: 1
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
          if (this.recipe.instructions) {
            this.max_len = this.recipe.instructions.length;
          }
          
        }

        //from api
        else{
          let response;
          try {
            response = await axios.get(`http://localhost/recipes/${recipeId}`);
          } catch (error) {
            console.error("Error fetching recipe from API:", error.response ? error.response.status : error.message);
            this.$router.replace("/NotFound");
            return;
          }
          data = response.data;

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
        if (this.recipe.instructions) {
          this.max_len = this.recipe.instructions.length;
        }
        } 
      },
      multiplyIngredients() {
        this.multipliedIngredients = this.multipliedIngredients.map(ingredient => ({
          ...ingredient,
          amount: ingredient.amount * 2
        }));

        this.max_len = this.recipe.instructions.length;
      },
      /**
       * Save the progress of the recipe to the local storage
       */
      async saveProgress() {
        // localStorage.setItem(`recipeProgress-${this.recipe.id}`, JSON.stringify(this.stepCompleted));
        try{
          this.axios.defaults.withCredentials = true;
          await this.axios.post(`http://localhost/recipes/${this.recipe.id}/progress`, {progress: JSON.stringify(this.stepCompleted)} );
          console.log('Recipe progress saved successfully.');
        } catch (error) {
          onsole.error('Error saving recipe progress:', error);
        }
        this.updateProgress();
      },
      /**
       * Load the progress of the recipe from the local storage
       */
      async loadProgress() {
        // const savedProgress = localStorage.getItem(`recipeProgress-${this.recipe.id}`);
        try{
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(`http://localhost/recipes/${this.recipe.id}/progress`);
          const savedProgress = response.data || null;
          if (savedProgress) {
            this.stepCompleted = JSON.parse(savedProgress);
          } else {
            this.stepCompleted = Array(this.recipe.instructions.length).fill(false);
          }
        } catch (error) {
        console.error('Error fetching recipe progress:', error);
        this.stepCompleted = Array(this.recipe.instructions.length).fill(false);
        }
          this.updateProgress();        
      },
      logout() {
        // Implement the logout logic and clear the progress
        localStorage.removeItem(`recipeProgress-${this.recipe.id}`);
        this.stepCompleted = Array(this.recipe.instructions.length).fill(false);
      },
      updateProgress() {
        const completedSteps = this.stepCompleted.filter(step => step).length;
        if (this.max_len != 0) {
          this.progress = (completedSteps / this.max_len) * this.max_len;
        }
      },
    },
    mounted() {
      this.fetchRecipe();
      this.updateProgress();
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
  
<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
import axios from 'axios';
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    listType: {
      type: String,
      default: 'random' // Can be 'lastViewed' or 'random'
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      if (this.listType === 'lastviewed'){
        let viewedRecipes = JSON.parse(localStorage.getItem('lastviewed')) || [];
        console.log('Viewed recipes:', viewedRecipes);

        this.recipes = [];
        // Ensure we have at least 3 viewed recipes
        if (viewedRecipes.length >= 3) {
          const recipePromises = [
            this.getrecipe(viewedRecipes[viewedRecipes.length - 1]),
            this.getrecipe(viewedRecipes[viewedRecipes.length - 2]),
            this.getrecipe(viewedRecipes[viewedRecipes.length - 3])
          ];

          // Wait for all recipe promises to resolve
          const recipes = await Promise.all(recipePromises);
          console.log('Fetched recipes:', recipes);
          this.recipes.push(...recipes);
        }
        else if (viewedRecipes.length >= 2) {
          const recipePromises = [
            this.getrecipe(viewedRecipes[viewedRecipes.length - 1]),
            this.getrecipe(viewedRecipes[viewedRecipes.length - 2]),
          ];

          // Wait for all recipe promises to resolve
          const recipes = await Promise.all(recipePromises);
          console.log('Fetched recipes:', recipes);
          this.recipes.push(...recipes);
        }
        else if (viewedRecipes.length >= 1) {
          const recipePromises = [
            this.getrecipe(viewedRecipes[viewedRecipes.length - 1]),
          ];

          // Wait for all recipe promises to resolve
          const recipes = await Promise.all(recipePromises);
          console.log('Fetched recipes:', recipes);
          this.recipes.push(...recipes);
        }
      }
      else{
        try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(amountToFetch);


        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
      }
    },

  async getrecipe(id) {
    
    const apiKey = 'b1a72f1616ff413e984ea8dc1377d964';
    const recipeId = id;
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
      console.log('Recipe API response:', response);

      const {
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data;
      const _instructions = analyzedInstructions
        .map(instruction => instruction.steps)
        .reduce((allSteps, steps) => [...allSteps, ...steps], []);

      return {
        _instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        id
      };
    } catch (error) {
      console.error('Error fetching recipe from API:', error.response ? error.response.status : error.message);
      return null; // Return null to handle the error gracefully
    }
  }
}
}
</script>

<!-- <style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style> -->
<style scoped>
.recipe-preview-list {
  margin: 20px 0;
}
.recipe-preview {
  margin-bottom: 20px;
  text-align: center;
}
.recipe-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 10px;
}
.recipe-title {
  font-size: 1.2em;
  margin: 10px 0;
}
.recipe-details {
  color: #666;
}
h3 {
  color: #42b983; /* Pastel green */
  align-self: center;
  text-align: center; /* Center text horizontally */
  margin: 0; /* Remove default margin */
  
  /* Flexbox adjustments */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensures it takes up full height of its container */
}

</style>


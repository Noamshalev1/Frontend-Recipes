<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped" v-if="recipe._instructions && recipe._instructions.length">
            Instructions:
            <ol>
              <li v-for="(s, index) in recipe._instructions" :key="index">
                {{ s.step }}
              </li>
            </ol>
          </div>
          <div class="text-center mt-3">
            <b-button variant="primary" size="sm" @click="goToPreparationPage">
              <b-icon icon="play-circle"></b-icon> Prepare
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      recipe: null,
      apiKey: '709325a1a8844ca3ab65110a4d2e4b90' // Add your Spoonacular API key here
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;
      let response;

      // Fetch the recipe data from the API
      try {
        response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`);
      } catch (error) {
        console.error("Error fetching recipe from API:", error.response ? error.response.status : error.message);
        this.$router.replace("/NotFound");
        return;
      }

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

      this.recipe = {
        _instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      };
      this.saveToLastViewed();
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  },
  methods: {
    goToPreparationPage() {
      this.$router.push({ name: "recipeprep", params: { id: this.$route.params.recipeId } });
    },
    saveToLastViewed(){
    let lastViewedRecipes = JSON.parse(localStorage.getItem('lastviewed')) || [];
      
      // Add the recipe ID if it doesn't already exist in the list
      if (!lastViewedRecipes.includes(this.recipe.id)) {
        lastViewedRecipes.push(this.recipe.id);
        // Limit to the last 10 viewed recipes (optional)
        if (lastViewedRecipes.length > 10) {
          lastViewedRecipes.shift();
        }
        localStorage.setItem('lastviewed', JSON.stringify(lastViewedRecipes));
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

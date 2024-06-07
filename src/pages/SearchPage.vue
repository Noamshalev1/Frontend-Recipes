<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-input-group class="mt-3">
        <b-form-input v-model="searchQuery" placeholder="type to search for recipie" @keyup.enter="performSearch"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="performSearch">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div v-if="searchQuery.length === 0">
      <!-- Show nothing if there's no query -->
    </div>
    <div class="recipes" v-else-if="filteredRecipes.length">
      <RecipePreview v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <div v-else>
      <p>No recipes found. Please enter a search query.</p>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../../src/components/RecipePreview.vue";
import recipes from '../assets/mocks/recipe_preview.json';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      searchQuery: "",
      recipes: [],
      filteredRecipes: []
    };
  },
  created() {
    this.recipes = recipes;
    this.loadLastSearch();
    },
  methods: {
    performSearch() {
      this.searchQuery = this.searchQuery.toLowerCase();
      if (this.searchQuery) {
        this.filteredRecipes = this.recipes.filter(recipe => {
          if (this.searchQuery === "vegan") {
            return recipe.vegan;
          } else if (this.searchQuery === "vegetarian") {
            return recipe.vegetarian;
          } else if (this.searchQuery === "gluten free") {
            return recipe.glutenFree;
          } else {
            return recipe.title.toLowerCase().includes(this.searchQuery) ||
                   recipe.summary.toLowerCase().includes(this.searchQuery);
            
          }
        });
        this.saveLastSearch(this.searchQuery);
      } else {
        this.filteredRecipes = [];
      }
    },
    saveLastSearch() {
      localStorage.setItem('lastSearch', this.searchQuery);
    },
    loadLastSearch() {
      const lastSearch = localStorage.getItem('lastSearch');
      if (lastSearch) {
        this.searchQuery = lastSearch;
        this.performSearch();
      }
    }
  }
};
</script>

<style scoped>
.recipes {
  margin-top: 20px;
  display: flex;
}
.recipe-column {
  margin-bottom: 20px;
}
</style>
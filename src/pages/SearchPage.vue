<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-input-group class="mt-3">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input v-model="searchQuery" placeholder="type to search for recipie" @keyup.enter="performSearch"></b-form-input>
        <!-- <b-input-group-append>
          <b-button variant="info" @click="performSearch">Search</b-button>
        </b-input-group-append> -->
        <template #append>
          <b-dropdown :text="`Number of Recipes: ${resultsCount}`" variant="info">
            <b-dropdown-item @click="updateResultsCount(5)" :active="resultsCount === 5">5</b-dropdown-item>
            <b-dropdown-item @click="updateResultsCount(10)" :active="resultsCount === 10">10</b-dropdown-item>
            <b-dropdown-item @click="updateResultsCount(15)" :active="resultsCount === 15">15</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
    </div>
    <div v-if="searchQuery.length === 0">
      <!-- Show nothing if there's no query -->
    </div>
    <div class="row" v-else-if="filteredRecipes.length">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="recipe in limitedFilteredRecipes" :key="recipe.id">
        <RecipePreview :recipe="recipe" />
      </div>
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
      filteredRecipes: [],
      resultsCount: 5,
    };
  },
  computed: {
    limitedFilteredRecipes() {
      return this.filteredRecipes.slice(0, this.resultsCount);
    }
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
    },
    updateResultsCount(count) {
      this.resultsCount = count;
      this.performSearch(); // Refresh search results with new count
    },
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
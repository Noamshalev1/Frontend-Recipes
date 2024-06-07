<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-input-group prepend="Search" class="mt-3">
        <b-form-input v-model="searchQuery" placeholder="type to search for recipie" @keyup.enter="performSearch"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="performSearch">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div class="recipes" v-if="filteredRecipes.length">
      <RecipePreview v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import RecipePreview from "../../src/components/RecipePreviewList.vue";
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
      const query = this.searchQuery.toLowerCase();
      if (query) {
        this.filteredRecipes = this.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.summary.toLowerCase().includes(query)||
          (query === "vegan" && recipe.vegan) ||
          (query === "vegetarian" && recipe.vegetarian) ||
          (query === "gluten free" && recipe.glutenFree)
        );
        this.saveLastSearch(query);
      } else {
        this.filteredRecipes = [];
      }
    },
    saveLastSearch(query) {
      localStorage.setItem('lastSearch', query);
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
}
</style>
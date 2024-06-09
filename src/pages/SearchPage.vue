<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-input-group class="mt-3">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input v-model="searchQuery" placeholder="Type to search for recipe" @keyup.enter="performSearch"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="performSearch">Search</b-button>
        </b-input-group-append>
        <template #append>
          <b-dropdown :text="`Number of Recipes: ${resultsCount}`" variant="secondary">
            <b-dropdown-group header="Choose option" class="small">
              <b-dropdown-item-button @click="updateResultsCount(5)">
                <b-icon :icon="resultsCount === 5 ? 'check' : 'blank'" aria-hidden="true"></b-icon>
                5 <span class="sr-only"></span>
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="updateResultsCount(10)">
                <b-icon :icon="resultsCount === 10 ? 'check' : 'blank'" aria-hidden="true"></b-icon>
                10 <span class="sr-only"></span>
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="updateResultsCount(15)">
                <b-icon :icon="resultsCount === 15 ? 'check' : 'blank'" aria-hidden="true"></b-icon>
                15 <span class="sr-only"></span>
              </b-dropdown-item-button>
            </b-dropdown-group>
          </b-dropdown>
        </template>
      </b-input-group>
      <b-input-group class="mt-3">
        <b-dropdown :text="selectedCuisine ? selectedCuisine : 'Select Cuisine'" variant="secondary">
          <b-dropdown-item v-for="cuisine in cuisines" :key="cuisine" @click="selectedCuisine = cuisine">{{ cuisine }}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="selectedDiet ? selectedDiet : 'Select Diet'" variant="secondary">
          <b-dropdown-item v-for="diet in diets" :key="diet" @click="selectedDiet = diet">{{ diet }}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown :text="`Selected Intolerances (${selectedIntolerances.length})`" variant="secondary">
          <b-dropdown-item v-for="intolerance in intolerances" :key="intolerance" @click="toggleIntolerance(intolerance)">
            <b-form-checkbox :checked="selectedIntolerances.includes(intolerance)">
              {{ intolerance }}
            </b-form-checkbox>
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="Sort By">
          <b-dropdown-item-button @click="changeSort('popularity')">
            <b-icon :icon="sortOption === 'popularity' ? 'check' : 'blank'" aria-hidden="true"></b-icon>
            Popularity
          </b-dropdown-item-button>
          <b-dropdown-item-button @click="changeSort('prepTime')">
            <b-icon :icon="sortOption === 'prepTime' ? 'check' : 'blank'" aria-hidden="true"></b-icon>
            Preparation Time
          </b-dropdown-item-button>
        </b-dropdown>
      </b-input-group>
    </div>
    <div class="recipes">
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
      cuisines: [
        'African', 'American', 'British', 'Japanese', 'Jewish',
        'Mexican', 'Spanish', 'Thai', 'Vietnamese', 'Nordic',
        'European', 'French'
      ],
      selectedCuisine: null,
      diets: [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
        'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Whole30'
      ],
      selectedDiet: null,
      intolerances: [
        'Dairy', 'Egg', 'Gluten', 'Peanut', 'Seafood',
        'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
      ],
      selectedIntolerances: [],
      sortOption: 'popularity', // Default sort option
      sortDirection: 'desc' // Default sort direction
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
    changeSort(option) {
      if (this.sortOption === option) {
        // If already selected, do nothing
        return;
      }
      this.sortOption = option;
      this.performSearch(); // Re-run the search with the new sort settings
    },
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
        if (this.selectedCuisine) {
          this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.cuisine === this.selectedCuisine);
        }
        if (this.selectedDiet) {
          this.filteredRecipes = this.filteredRecipes.filter(recipe => recipe.diet === this.selectedDiet);
        }
        if (this.selectedIntolerances.length) {
          this.filteredRecipes = this.filteredRecipes.filter(recipe =>
            this.selectedIntolerances.every(intolerance => recipe.intolerances.includes(intolerance))
          );
        }
        this.filteredRecipes.sort((a, b) => {
          if (this.sortOption === 'popularity') {
            return this.sortDirection === 'asc' ? a.aggregateLikes - b.aggregateLikes : b.aggregateLikes - a.aggregateLikes;
          } else if (this.sortOption === 'prepTime') {
            return this.sortDirection === 'asc' ? a.readyInMinutes - b.readyInMinutes : b.readyInMinutes - a.readyInMinutes;
          }
          return 0;
        });
        this.saveLastSearch(this.searchQuery);
      } else {
        this.filteredRecipes = [];
      }
    },
    saveLastSearch(query) {
      localStorage.setItem("lastSearch", query);
    },
    loadLastSearch() {
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        this.searchQuery = lastSearch;
        this.performSearch();
      }
    },
    updateResultsCount(count) {
      this.resultsCount = count;
      this.performSearch(); // Refresh search results with new count
    },
    toggleIntolerance(intolerance) {
      const index = this.selectedIntolerances.indexOf(intolerance);
      if (index > -1) {
        this.selectedIntolerances.splice(index, 1);
      } else {
        this.selectedIntolerances.push(intolerance);
      }
      this.performSearch();
    },
  },
};
</script>

<style scoped>
.mt-3 {
  margin-bottom: 20px;
}
</style>

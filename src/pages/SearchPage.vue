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
          <div style="max-height: 200px; overflow-y: auto;">          
            <b-dropdown-item v-for="cuisine in cuisines" :key="cuisine" @click="setCuisine(cuisine)">{{ cuisine }}</b-dropdown-item>
        </div>
        </b-dropdown>
        <b-dropdown :text="selectedDiet ? selectedDiet : 'Select Diet'" variant="secondary">
          <b-dropdown-item v-for="diet in diets" :key="diet" @click="setDiet(diet)">{{ diet }}</b-dropdown-item>
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
      <div v-else-if="recipes.length === 0">
        <p>No recipes found. Please adjust your search or filters.</p>
      </div>
      <div class="row" v-else>
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="recipe in limitedRecipes" :key="recipe.id">
          <RecipePreview :recipe="recipe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../../src/components/RecipePreview.vue";
import axios from 'axios';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      searchQuery: "",
      recipes: [],
      resultsCount: 5,
      cuisines: [
        'African','Asian', 'American', 'British','Cajun','Caribbean','Chinese','Eastern European','European',
        'French','German','Greek','Indian','Irish','Italian','Japanese', 'Jewish','Korean','Latin American','Mediterranean','Mexican',
        'Middle Eastern','Nordic','Southern',
        'Spanish', 'Thai', 'Vietnamese', 
         
      ],
      selectedCuisine: null,
      diets: [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
        'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo','Primal','Low FODMAP', 'Whole30'
      ],
      selectedDiet: null,
      intolerances: [
        'Dairy', 'Egg', 'Gluten','Grain', 'Peanut', 'Seafood',
        'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
      ],
      selectedIntolerances: [],
      sortOption: 'popularity', // Default sort option
      sortDirection: 'desc' // Default sort direction
    };
  },
  computed: {
    limitedRecipes() {
      return this.recipes.slice(0, this.resultsCount);
    }
  },
  created() {
    this.loadLastSearch();
  },
  methods: {
    changeSort(option) {
      if (this.sortOption === option) {
        return;
      }
      this.sortOption = option;
      
      this.recipes.sort((a, b) => {
        if (this.sortOption === 'popularity') {
          return this.sortDirection === 'asc' ? a.aggregateLikes - b.aggregateLikes : b.aggregateLikes - a.aggregateLikes;
        } else if (this.sortOption === 'prepTime') {
          return this.sortDirection === 'asc' ? a.readyInMinutes - b.readyInMinutes : b.readyInMinutes - a.readyInMinutes;
        }
        return 0;
  });
    },
  /**
   * Perform a search with the current search query and filters.
   */
    async performSearch() {
      const baseURL = 'https://recipes-heaven.cs.bgu.ac.il/recipes/search';//change to server url at the end !!<-----------------
      console.log('Searching for:', this.searchQuery);
      let params = {
        query: this.searchQuery || '', // Allow search with filters even if query is empty
        number: this.resultsCount,
        sort: this.sortOption,
        // apiKey: apiKey,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerances: this.selectedIntolerances.join(','),
        addRecipeInformation: true // Add this parameter to include detailed recipe information
    };

      // Remove empty parameters
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });

      try {
      const response = await this.axios.post(baseURL, params);
      this.recipes = response.data.results;
    } catch (error) {
      console.error('Error fetching recipes here:', error);
    }
    },
    /**
     * Load the last search query from the server and perform the search.
     */
    async loadLastSearch() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get('https://recipes-heaven.cs.bgu.ac.il/users/search');
        const lastSearch = response.data[0].searchQuery;
        console.log("LS: "+lastSearch);
      if (lastSearch) {
        this.searchQuery = lastSearch;
        this.performSearch();
        console.log('Last search loaded successfully.');
      }
      } catch (error) {
        console.error('Error loading last search:', error);
      }
    },
    updateResultsCount(count) {
      this.resultsCount = count;
      this.performSearch();
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
    setCuisine(cuisine) {
      this.selectedCuisine = cuisine;
      this.performSearch();
    },
    setDiet(diet) {
      this.selectedDiet = diet;
      this.performSearch();
    }
  }
};
</script>

<style scoped>
.mt-3 {
  margin-bottom: 20px;
}
</style>

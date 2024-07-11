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
              <div>
              <b-icon icon="eye" class="viewed-icon"></b-icon>
              <span v-if="recipe.vegetarian"><img src="../assets/vegiterian.png" class="vegi" /></span>
              <span v-if="recipe.vegan"><img src="../assets/vegan.png" class="vegan" /></span>
              <span v-if="recipe.glutenFree"><img src="../assets/glutenfree.png" class="glutenfree" /></span>
            </div>
            <div class="btn-group-toggle">
            <label class="btn btn-secondary active" style="background-color: white;">
              <!-- Checkbox to track favorite state -->
              <input
                    v-if="this.$root.store.username"
                    type="checkbox"
                    v-model="isFavorite"
                    @change="toggleFavorite"
                    style="display: none;"
                  />
                  <!-- Favorite icon that toggles the checkbox and favorite status -->
                  <img
                    :src="favoriteImage"
                    alt="Favorite"
                    class="favorite-icon"
                    @click="toggleFavorite"
                  />
            </label>
        </div>
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
           <div class="text-center mt-3">
            <b-button variant="success" size="sm" @click="addToGuestPlan">
              <b-icon icon="plus-circle"></b-icon> Add to Guest Plan
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import favoriteImage  from '../components/RecipePreview.vue';
export default {
  data() {
    return {
      isFavorite: false,
      recipe: null,
      guestPlan: [],
      guests: 1,      
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;
      let response;
      console.log(recipeId)
      // Fetch the recipe data from the API
      try {
        response = await axios.get(`http://localhost/recipes/${recipeId}`);
      } catch (error) {
        console.error("Error fetching recipe from API:", error.response ? error.response.status : error.message);
        this.$router.replace("/NotFound");
        return;
      }

      const {
            analyzedInstructions = [],
            extendedIngredients,
            aggregateLikes,
            readyInMinutes,
            image,
            title,
            vegan,
            vegetarian,
            glutenFree,
            id,
        } = response.data;
        console.log(response);

      const _instructions = analyzedInstructions
        .map(instruction => instruction.steps)
        .reduce((allSteps, steps) => [...allSteps, ...steps], []);

      this.recipe = {
        _instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        id
      };

      //this.saveToLastViewed();
      this.isFavorite = await this.getFavoriteState(this.recipe);
      console.log(this.recipe)
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  },
  methods: {
    goToPreparationPage() {
      this.$router.push({ name: "recipeprep", params: { id: this.$route.params.recipeId } });
    },
    // saveToLastViewed(){
      
    //   let lastViewedRecipes = JSON.parse(localStorage.getItem('lastviewed')) || [];
    //   lastViewedRecipes.push(this.$route.params.recipeId);
    //       // Limit to the last 10 viewed recipes (optional)
    //   if (lastViewedRecipes.length > 10) {
    //     lastViewedRecipes.shift();
    //   }
    //   localStorage.setItem('lastviewed', JSON.stringify(lastViewedRecipes));
    // },
    async toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      try {
        if (this.isFavorite) {
          this.axios.defaults.withCredentials = true;
          await this.axios.post('http://localhost/users/favorites', { recipeId: this.recipe.id });
        } else {
          console.log(this.recipe.id);
          this.axios.defaults.withCredentials = true;
          await this.axios.delete(`http://localhost/users/favorites/${this.recipe.id}`);
        }
      } catch (error) {
        console.error("Error updating favorite status:", error.response ? error.response.status : error.message);
        // Optionally revert the state if the request fails
        this.isFavorite = !this.isFavorite;
      }
    },
    async getFavoriteState(recipe) {
      try {
        console.log("Load favorite to RecipeViewPage");
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(`http://localhost/users/favorites`);
        console.log(response);
        const favorites = response.data || [];
        console.log("Fav: " + favorites.some(r => r.id === recipe.id));
        return favorites.some(r => r.id === recipe.id);
      } catch (error) {
        console.log("Error fetching favorite state:", error.response ? error.response.status : error.message);
        return false;
      }
    },
    addToGuestPlan() {
      this.guestPlan.push(this.recipe);
      this.updateIngredientsForGuests();
    },
    updateIngredientsForGuests() {
      this.recipe.extendedIngredients = this.recipe.extendedIngredients.map(ingredient => {
        const updatedIngredient = { ...ingredient };
        updatedIngredient.original = `${ingredient.amount * this.guests} ${ingredient.unit} ${ingredient.name}`;
        return updatedIngredient;
      });
    }
  },
  computed: {
    favoriteImage() {
      return this.isFavorite ? require('@/assets/favorite.png') : require('@/assets/notfavorite.png');
    },
    updatedIngredients() {
      return this.recipe.extendedIngredients.map(ingredient => ({
        ...ingredient,
        original: `${ingredient.amount * this.guests} ${ingredient.unit} ${ingredient.name}`
      }));
    }
  },
  watch: {
  isFavorite(newVal) {
    console.log(`Favorite status changed to: ${newVal}`);
  }
}

  
};
</script>

<style scoped>
.thick-progress .progress-bar {
  height: 20px; /* Adjust the height to make the progress bar thicker */
}

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
.vegi {
  width: 20px;
  height: auto;
  margin-right: 5px;
}

.vegan,
.glutenfree {
  width: 25px;
  height: auto;
  margin-right: 5px;
}
.favorite-icon {
  width: 20px;
  height: 20px;
}
.viewed-icon{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>

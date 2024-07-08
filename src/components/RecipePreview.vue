<template>
  <div class="card recipe-card" style="width: 18rem;">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="card-img-link"
    >
    <div class="image-container">
      <img v-if="image_load" :src="recipe.image" class="card-img-top recipe-image" @click="markAsViewed()" />
    </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title" :title="recipe.title">{{ recipe.title }}</h5>
      <ul class="card-text recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div class="card-icons">
        <b-icon v-if="isViewed" icon="eye" class="viewed-icon"></b-icon>
        <span v-if="recipe.vegetarian"><img src="../assets/vegiterian.png" class="vegi" /></span>
        <span v-if="recipe.vegan"><img src="../assets/vegan.png" class="vegan" /></span>
        <span v-if="recipe.glutenFree"><img src="../assets/glutenfree.png" class="glutenfree" /></span>
        <div class="btn-group-toggle">
          <label class="btn btn-secondary active" style="background-color: white;">
            <input
              type="checkbox"
              v-model="isFavorite"
              @change="toggleFavorite"
            >
            <img
              :src="favoriteImage"
              alt="Favorite"
              class="favorite-icon"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: 'RecipePreviewCard',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image_load: true,
      isFavorite: this.getFavoriteState(this.recipe),
      isViewed: this.checkIfViewed(this.recipe.id),
    };
  },
  computed: {
    favoriteImage() {
      console.log(this.isFavorite)
      return this.isFavorite ? require('@/assets/favorite.png') : require('@/assets/notfavorite.png');
    }
  },
  methods: {
    // favoriteImage() {
    //   return this.isFavorite ? require('@/assets/favorite.png') : require('@/assets/notfavorite.png');
    // },
    async toggleFavorite() {
      console.log("toggle "+this.isFavorite);
      this.isFavorite = !this.isFavorite;
      console.log("toggle "+this.isFavorite);
      try {
        if (!this.isFavorite) {
          this.axios.defaults.withCredentials = true;
          await this.axios.post('http://localhost/users/favorites', { recipeId: this.recipe.id});
          this.addToFavorites();
        } else {
          this.axios.defaults.withCredentials = true;
          await this.axios.delete('http://localhost/users/favorites', { data: { recipeId: this.recipe.id} });
          this.removeFromFavorites();
        }
      } catch (error) {
        console.error("Error updating favorite status:", error.response ? error.response.status : error.message);
        // Optionally revert the state if the request fails
        this.isFavorite = !this.isFavorite;
      }
  },
    addToFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.some(r => r.id === this.recipe.id)) {
        favorites.push(this.recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    },
    removeFromFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let index = favorites.findIndex(r => r.id === this.recipe.id);
      if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    },
    markAsViewed() {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      if (!viewedRecipes.includes(this.recipe.id)) {
        viewedRecipes.push(this.recipe.id);
        localStorage.setItem('viewedRecipes', JSON.stringify(viewedRecipes));
        this.isViewed = true; // Update the state to show the viewed icon
      }
    },
    checkIfViewed(recipeId) {
      let viewedRecipes = JSON.parse(localStorage.getItem('viewedRecipes')) || [];
      return viewedRecipes.includes(recipeId);
    },
    getFavoriteState(recipe) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some(r => r.id === recipe.id);
    },
    async loadFavorites() {
    try {
      console.log("Try")
      this.axios.defaults.withCredentials = true;
      const response = await this.axios.get(`http://localhost/users/favorites`);
      console.log(response)
      const favorites = response.data;
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Error loading favorite recipes:", error.response ? error.response.status : error.message);
    }
  }
  },
  created() {
    if (this.$root.store.username){
      this.loadFavorites;
      this.isFavorite = this.getFavoriteState(this.recipe);
      this.isViewed = this.checkIfViewed(this.recipe.id);
    }
  },
  updated() {
    this.isFavorite = this.getFavoriteState(this.recipe);
    this.isViewed = this.checkIfViewed(this.recipe.id);
  },
  
};
</script>

<style scoped>
.recipe-card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 120px;
}

.card-img-link {
  display: block;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
}

.recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.recipe-image:hover {
  opacity: 0.3;
}


.card-body {
  padding: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-overview {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

.card-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.favorite-icon {
  width: 20px;
  height: 20px;
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

.btn-group-toggle {
  margin-left: auto;
}

.viewed-icon{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

</style>

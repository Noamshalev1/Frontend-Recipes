<template>
  <div class="card recipe-card" style="width: 18rem;">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="card-img-link"
    >
      <img v-if="image_load" :src="recipe.image" class="card-img-top recipe-image" />
    </router-link>
    <div class="card-body">
      <h5 class="card-title" :title="recipe.title">{{ recipe.title }}</h5>
      <ul class="card-text recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div class="card-icons">
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
              :src="isFavorite ? require('@/assets/favorite.png') : require('@/assets/notfavorite.png')"
              alt="Favorite"
              class="favorite-icon"
              style="width: 20px; height: 20px;"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      isFavorite: this.getFavoriteState(this.recipe)
    };
  },
  computed: {
    favoriteImage() {
      return this.isFavorite ? require('@/assets/favorite.png') : require('@/assets/notfavorite.png');
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        this.addToFavorites();
      } else {
        this.removeFromFavorites();
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
    loadImage() {
      this.image_load = true;
    },
    getFavoriteState(recipe) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some(r => r.id === recipe.id);
    }
  }
};
</script>

<style scoped>
.recipe-card {
  margin-bottom: 20px;
  margin-left: 120px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img-link {
  display: block;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
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
</style>

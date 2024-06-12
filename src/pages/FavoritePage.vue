<template>
  <div class="container">
    <h1 class="title">Favorites Page</h1>
    <div v-if="favorites.length === 0" class="empty-state">
      No favorite recipes found.
    </div>
    <div v-else class="favorites-list">
      <RecipePreview
        v-for="recipe in favorites"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
</template>

<script>
import RecipePreview from '@/components/RecipePreview.vue';

export default {
  name: 'FavoritesPage',
  components: {
    RecipePreview
  },
  data() {
    return {
      favorites: []
    };
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    loadFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.favorites = favorites;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.empty-state {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-top: 20px;
}

.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}
.title {
  font-family: 'Arial', sans-serif;
  font-size: 3rem;
  color: #4caf50;
  text-align: center;
  padding: 20px;
  border: 2px solid #4caf50;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

</style>

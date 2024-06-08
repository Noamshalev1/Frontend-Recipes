<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
    </router-link>
    <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
        <div class="image-container">
          <img v-if="recipe.image" :src="getImageUrl(recipe.image)" class="recipe-image"/>
        </div>
        <ul class="recipe-overview">
          <li>מרכיבים: {{ recipe.ingredients.join(', ') }}</li>
          <li>הכנה: {{ recipe.preparation }}</li>
          <li>נהוג להכין: {{ recipe.when }}</li>
          <li>של מי המתכון: {{ recipe.owner }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FamilyRecipes',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl(image) {
      try {
        return require(`@/assets/${image}`);
      } catch (e) {
        console.error(`Image not found: ${image}`);
        return '';
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.recipe-footer {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.recipe-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.recipe-image {
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-overview {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-overview li {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  text-align: center;
}
</style>

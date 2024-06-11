<template>
  <div class="recipe-preview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
      <!-- This can be used if you need a clickable link -->
    </router-link>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <div class="image-container">
        <b-carousel
          id="recipe-carousel"
          v-if="recipe.image && recipe.image.length"
          :interval="4000"
          controls
          indicators
          background="#ababab"
        >
          <b-carousel-slide
            v-for="(img, index) in recipe.image"
            :key="index"
            :img-src="getImageUrl(img)"
            :alt="'Image ' + (index + 1)"
            class="recipe-image"
          ></b-carousel-slide>
        </b-carousel>
      </div>
      <ul class="recipe-overview">
        <li>מרכיבים: {{ ingredientNames}}</li>
        <li>הכנה: {{ recipe.preparation }}</li>
        <li>נהוג להכין: {{ recipe.when }}</li>
        <li>של מי המתכון: {{ recipe.owner }}</li>
      </ul>
    </div>
    <div class="text-center mt-3">
            <b-button variant="danger" size="sm" @click="goToPreparationPage">
              <b-icon icon="play-circle"></b-icon> Prepare
            </b-button>
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
  computed: {
  ingredientNames() {
    return this.recipe ? this.recipe.ingredients.map(ingredient => ingredient.name).join(', ') : '';
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
    },
    goToPreparationPage() {
      this.$router.push({ name: "recipeprep", params: { id: this.recipe.id },query: { collection:"family" } });
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
  width: 100%; /* Adjust the width as needed */
  max-width: 400px; /* Maximum width of the container */
  height: 500px; /* Fixed height for the container */
  margin-bottom: 10px;
  overflow: hidden; /* Ensures any overflowed content is hidden */
  position: relative; /* For better positioning of child elements */
  margin-left: 250px;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire container */
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

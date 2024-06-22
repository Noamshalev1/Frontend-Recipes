<template>
  <div>
    <h1 class="title">My Recipes</h1>
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
      <h3>{{ recipe.title }}</h3>
      <img :src="recipe.image || defaultImage" alt="Recipe Image" class="recipe-image" />
      <p>{{ recipe.summary }}</p>
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          {{ ingredient.amount?.metric?.value }} {{ ingredient.amount?.metric?.unit }} {{ ingredient.name }}
        </li>
      </ul>
      <p>Preparation Time: {{ recipe.readyInMinutes }} minutes</p>
      <p>Servings: {{ recipe.servings }}</p>
      <p>Instructions:</p>
      <ul v-if="recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0">
        <li v-for="(step, index) in recipe.analyzedInstructions[0].steps" :key="index">
          Step {{ step.number }}: {{ step.step }}
        </li>
      </ul>
      <p v-else>No instructions available.</p>
      <b-button variant="primary" @click="prepareRecipe(recipe.id)">Prepare</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        image: '@/assets/myrecipes.png' // Placeholder image
      },
      recipes: [],
      defaultImage: require('@/assets/myrecipes.png'),

    };
  },
  mounted() {
    this.loadRecipes();
  },
  methods: {
    loadRecipes() {
      let storedRecipes = localStorage.getItem('myRecipes');
      this.recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      this.recipes.forEach(recipe => {
        if (!recipe.image) {
          recipe.image = this.defaultImage;
        }
      });
    },
    prepareRecipe(id) {
      console.log(id)
      this.$router.push({ name: 'recipeprep', params: { id: id }, query: { collection:"myrecipes" } })
    },

  }
};
</script>

<style scoped>
.recipe-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
}

.recipe-image {
  max-width: 100%;
  height: 300px;
  width: 300px;
  margin-bottom: 15px;
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

<template>
  <div>
    <h2>My Recipes</h2>
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.summary }}</p>
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
      <p>Preparation Time: {{ recipe.readyInMinutes }} minutes</p>
      <p>Servings: {{ recipe.servings }}</p>
      <p>Instructions: {{ recipe.instructions }}</p>
      <b-button variant="primary" @click="prepareRecipe(recipe.id)">Prepare</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.loadRecipes();
  },
  methods: {
    loadRecipes() {
      let storedRecipes = localStorage.getItem('myRecipes');
      this.recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    },
    prepareRecipe(id) {
      this.$router.push({ name: 'recipeprep', params: { id } });
    }
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
</style>

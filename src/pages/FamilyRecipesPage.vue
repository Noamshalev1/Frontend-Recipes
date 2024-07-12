<template>
  <div class="container">
    <h1 class="title">Family Recipes Page</h1>
    <div class="recipes">
      <FamilyRecipes v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import FamilyRecipes from '../components/FamilyRecipes.vue';

export default {
  name: 'FamilyRecipesPage',
  components: {
    FamilyRecipes
  },
  data() {
    return {
      recipes: []
    };
  },
  async mounted() {
    await this.getRecipes(); // Call getRecipes when the page is loaded
  },
  methods:{
    async getRecipes(){
      this.axios.defaults.withCredentials = true;
      const response = await this.axios.get(`https://recipes-heaven.cs.bgu.ac.il/users/familyrecipes`);
      this.recipes = response.data;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
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

.recipes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

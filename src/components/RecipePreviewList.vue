<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(amountToFetch);


        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<!-- <style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style> -->
<style scoped>
.recipe-preview-list {
  margin: 20px 0;
}
.recipe-preview {
  margin-bottom: 20px;
  text-align: center;
}
.recipe-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto 10px;
}
.recipe-title {
  font-size: 1.2em;
  margin: 10px 0;
}
.recipe-details {
  color: #666;
}
h3 {
  color: #42b983; /* Pastel green */
  align-self: center;
  text-align: center; /* Center text horizontally */
  margin: 0; /* Remove default margin */
  
  /* Flexbox adjustments */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Ensures it takes up full height of its container */
}

</style>


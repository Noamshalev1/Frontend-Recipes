<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 left-column">
        <RecipePreviewList ref="recipeList" title="Explore these recipes" class="RandomRecipes" listType="random" />
        <button @click="generateRandomRecipes" class="btn btn-primary">Show More Recipes</button>
      </div>
      <div class="col-md-6 right-column">
        <div class="user-section">
          <span v-if="!$root.store.username">
            <Login/>
          </span>
          <span v-else>
            <RecipePreviewList
              title="Last Viewed Recipes"
              class="LastViewedRecipes"
              listType="lastviewed"
              disabled
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "../components/Login";
export default {
  components: {
    RecipePreviewList,
    Login
  },  
  data() {
    return {
      randomKey: 0
    };
  },
  methods: {
    generateRandomRecipes() {
      this.$refs.recipeList.updateRecipes();
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-primary {
  background-color: #138d56;
  border-color: #a3c4f3;
  margin-left: 195px;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.row {
  display: flex;
}

.left-column {
  flex: 1;
  padding-right: 10px;
}

.right-column {
  flex: 1;
  padding-left: 10px;
}

.user-section {
  display: flex;
  justify-content: center; /* Center horizontally */
  height: 100%;
}

.guest-message {
  margin-bottom: 20px;
}

.btn-success {
  background-color: #a8d5ba;
  border-color: #a8d5ba;
}

.btn-primary {
  background-color: #138d56;
  border-color: #a3c4f3;
  margin-left: 195px;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(5px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>

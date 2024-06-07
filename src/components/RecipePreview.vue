<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <span v-if="recipe.vegetarian"><img src="../assets/vegiterian.png" class="vegi"/></span>
      <span v-if="recipe.vegan"><img src="../assets/vegan.png" class="vegan"/></span>
      <span v-if="recipe.glutenFree"><img src="../assets/glutenfree.png" class="glutenfree"/></span>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: true
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview, .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  display: block;
  margin: auto;
  width: 60%; /* Adjust the width as needed */
  height: auto;
  object-fit: cover; /* Ensures the image covers the entire container */
}


/* Recipe Footer Styling */
.recipe-preview .recipe-footer {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #666;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .recipe-preview .recipe-footer {
    padding: 5px;
  }
  
  .recipe-preview .recipe-footer .recipe-title {
    font-size: 14px;
  }
  
  .recipe-preview .recipe-footer ul.recipe-overview li {
    font-size: 12px;
  }
}
.vegi {
  width: 20px; 
  height: auto; 
  margin: 5px;  
}

.vegan,
.glutenfree{
  width: 40px; 
  height: auto;
  margin: 5px
}

</style>

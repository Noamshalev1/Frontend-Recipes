<template>
  <b-modal v-model="showModal" title="Create New Recipe" @hide="onModalClose">
      <b-form-group label="Recipe Name:">
        <b-form-input v-model="recipe.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Description:">
        <b-form-textarea v-model="recipe.description" rows="3" required></b-form-textarea>
      </b-form-group>
      <b-form-group label="Ingredients:">
        <b-form-textarea v-model="recipe.ingredients" rows="3" required></b-form-textarea>
      </b-form-group>
      <b-form-group label="Preparation Time:">
        <b-form-input type="number" v-model="recipe.prepTime" required></b-form-input>
      </b-form-group>
      <b-form-group label="Instructions:">
        <b-form-textarea v-model="recipe.instructions" rows="5" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
  </b-modal>
</template>

<script>
export default {
  props: 
    ['showModal'],
  data() {
    return {
      recipe: {
        name: '',
        description: '',
        ingredients: '',
        prepTime: '',
        instructions: ''
      }
    };
  },
  methods: {
    createRecipe() {
      // Here, implement the logic to create a recipe
      this.$emit('hide'); // Notify the parent to hide the modal
    },
    onModalClose() {
      this.$emit('hide'); // Make sure this emits after the modal is set to close
    }
  }
};
</script>

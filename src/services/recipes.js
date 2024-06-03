// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  let usedIndices = new Set();

  while (recipes.length < amount && usedIndices.size < recipe_preview.length) {
    const randomIndex = Math.floor(Math.random() * recipe_preview.length);
    
    if (!usedIndices.has(randomIndex)) {
      recipes.push(recipe_preview[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return { data: { recipes: recipes } };
}


export function mockGetRecipeFullDetails(recipeId) {
    return { data: { recipe: recipe_full_view } } ;
  }
  

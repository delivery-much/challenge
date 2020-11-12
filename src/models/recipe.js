module.exports = (recipe) => {
  recipe.title = recipe.title.trim();
  recipe.ingredients = recipe.ingredients.split(',').map((value) => {
    return value.trim()
  }).sort();

  return recipe;
}

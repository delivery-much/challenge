const recipeSearch = require('../helpers/recipeSearch');
const gifSearch = require('../helpers/gifSearch');

module.exports = {
  async show(req, res, next) {
    const ingredients = req.query.i;
    const ingredientsArray = ingredients.split(',');
    const recipesResults = {
      keywords: [],
      recipes: [],
    };
    ingredientsArray.map((ingredients) =>
      recipesResults.keywords.push(ingredients)
    );

    if (recipesResults.keywords.length >= 4) {
      res.json({
        Error:
          '400 BAD REQUEST: Number of ingredients cannot be greater than three.',
      });
    }

    const recipes = await recipeSearch(ingredients);

    if (recipes.length == 0) {
      res.status(400).json({
        Error: ` 400 BAD REQUEST: No recipes were found with the ingredients ${ingredients}`,
      });
    }

    recipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients
        .replace(/ /g, '')
        .toLowerCase()
        .split(',');

      for (i = 0; i < ingredientsArray.length; i++) {
        if (recipeIngredients.indexOf(ingredientsArray[i]) < 0) {
          res.status(400).json({
            Error: `400 BAD REQUEST: ${ingredientsArray[i]} were not found in the database, make sure you typed correctly and try again.`,
          });
        }
      }

      const recipeTitle = recipe.title.replace(/\n/g, '');

      recipesResults.recipes.push({
        title: recipeTitle,
        ingredients: recipeIngredients.sort(),
        link: recipe.href,
        gif: '',
      });
    });

    for (i = 0; i < recipesResults.recipes.length; i++) {
      const gifUrl = await gifSearch(recipesResults.recipes[i].title);

      recipesResults.recipes[i].gif = gifUrl;
    }

    await res.json(recipesResults);
  },
};

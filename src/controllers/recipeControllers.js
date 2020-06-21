const recipeSearch = require('../helpers/recipeSearch');

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
    } else {
      const recipes = await recipeSearch(ingredients);
      console.log(recipes.length);

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
            console.log(recipeIngredients);

            res.status(400).json({
              Error: `400 BAD REQUEST: ${ingredientsArray[i]} were not found in the database, make sure you typed correctly and try again.`,
            });
          }
        }

        //const gifUrl = await gifSearch(recipe.title);

        recipesResults.recipes.push({
          title: recipe.title,
          ingredients: recipe.ingredients.split(','),
          link: recipe.href,
          gif: 'gifUrl', //Função para buscar gif...
        });
      });

      res.json(recipesResults);
    }
  },
};

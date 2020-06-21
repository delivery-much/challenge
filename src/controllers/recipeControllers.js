const axios = require('axios');

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
        Error: 'Sorry... Number of ingredients cannot be greater than three.',
      });
    } else {
      const recipes = await getRecipes(ingredients);

      recipes.forEach((recipe) => {
        //CRIAR FUNÇÃO OU IF PARA FILTRAR RESULTADOS QUE COMBINEM TODOS INGREDIENTES...
        recipesResults.recipes.push({
          title: recipe.title,
          ingredients: recipe.ingredients.split(','),
          link: recipe.href,
          gif: '', //Função para buscar gif...
        });
      });

      //console.log(recipes);

      async function getRecipes(ingredients) {
        //const allRecipes = [];
        //console.log(ingredients);
        return axios('http://www.recipepuppy.com/api', {
          params: {
            i: ingredients,
          },
          responseType: 'Stream',
        }).then((response) => {
          const recipes = response.data.results;
          const ingredientsSearchArr = ingredients.split(',');
          recipes.map((recipe) => {
            const recipeIngredients = recipe.ingredients
              .replace(/ /g, '')
              .toLowerCase()
              .split(',');
            for (i = 0; i < ingredientsSearchArr.length; i++) {
              if (recipeIngredients.indexOf(ingredientsSearchArr[i]) < 0) {
                console.log(recipeIngredients);
                return res.status(400).json({
                  Error: `Error, ${ingredientsSearchArr[i]} were not found in the database, make sure you typed correctly and try again.`,
                });
              }
            }
          });

          return recipes;
        });
      }
      res.json(recipesResults);
    }
  },
};

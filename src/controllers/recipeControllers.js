const axios = require('axios');

module.exports = {
  async show(req, res, next) {
    const ingredients = req.query.i;
    const ingredientsArray = ingredients.split(',');
    const recipesResults = {
      "keywords": [],
      "recipes":[]
    };
    ingredientsArray.map(ingredients => recipesResults.keywords.push(ingredients));


    if(recipesResults.keywords.length >= 4) {
      res.json({ "Error" : "Sorry... Number of ingredients cannot be greater than three."})
    } else {
      
      const recipes = await getRecipes(recipesResults);
      
      recipes.forEach(recipe => {
        //CRIAR FUNÇÃO OU IF PARA FILTRAR RESULTADOS QUE COMBINEM TODOS INGREDIENTES...
        recipesResults.recipes.push({
          "title": recipe.title,
          "ingredients": recipe.ingredients,
          "link": recipe.href,
          "gif": ""//Função para buscar gif...
        });
      });
      
      //console.log(recipes);
      
      async function getRecipes(recipesResults) {
        return axios('http://www.recipepuppy.com/api', {
        params: {
          i: ingredients
        },
        responseType: 'Stream'
      })
      .then((response) => {
        const recipes = response.data.results;
        return recipes;
        }
      ); 
      
      }
        res.json(recipesResults);
      }
  }  
}
const axios = require('axios');

module.exports = async function getRecipes(req) {
  return axios('http://www.recipepuppy.com/api', {
    params: {
      i: req,
    },
    responseType: 'Stream',
  }).then((response) => {
    const recipes = response.data.results;

    return recipes;
  });
};

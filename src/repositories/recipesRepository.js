const fetch = require('node-fetch');

const api = process.env.RECIPE_PUPPY_API;

const get = async (ingredients, success, fail) => {
  fetch(`${api}/?p=1&i=${ingredients}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      await ((res) => {
        res.json().then(async (resJson) => {
          if (resJson.status >= 300) {
            fail({
              message: 'Recipe Puppy API GET request failed.',
              status: resJson.status,
            });
          } else {
            success({
              message: 'Recipies found successfully',
              status: 200,
              recipes: resJson.results,
            });
          }
        });
      })
    )
    .catch((error) => {
      fail({
        message: 'Recipe Puppy API GET request failed.',
        status: 500,
        error,
      });
    });
};

module.exports = { get };

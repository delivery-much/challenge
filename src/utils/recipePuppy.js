const fetch = require('node-fetch');

const api = process.env.RECIPE_PUPPY_API;

const get = async (ingredients) => {
  fetch(`${api}/?p=1&i=${ingredients}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      await ((res) => {
        res.json().then((resJson) => {
          if (resJson.status >= 300) {
            return {
              message: 'Recipe Puppy API GET request failed.',
              status: resJson.status,
            };
          } else {
            return {
              message: 'Recipies found successfully',
              status: 200,
              res,
            };
          }
        });
      })
    )
    .catch((error) => {
      return res.status(500).send({
        message: 'Recipe Puppy API GET request failed.',
        status: 500,
        error,
      });
    });
};

module.exports = { get };

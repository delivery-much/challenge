const fetch = require('node-fetch');

const api = process.env.RECIPE_PUPPY_API;

const get = async (ingredients) => {
  const response = await fetch(`${api}/?p=1&i=${ingredients}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      await (async (res) => {
        return {
          message: 'Recipe Puppy API GET success.',
          status: 200,
          data: await res.json(),
        };
      })
    )
    .catch((error) => {
      return {
        message: 'Recipe Puppy API GET request failed.',
        status: 500,
        error,
      };
    });

  return response;
};

module.exports = { get };

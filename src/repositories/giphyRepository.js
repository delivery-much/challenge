const fetch = require('node-fetch');

const api = process.env.GIPHY_API;
const key = process.env.GIPHY_KEY;

const search = async (q) => {
  const response = await fetch(`${api}&q=${q}&api_key=${key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      await (async (res) => {
        return {
          message: 'GIPHY API SEARCH success.',
          status: 200,
          data: await res.json(),
        };
      })
    )
    .catch((error) => {
      return {
        message: 'GIPHY API SEARCH request failed.',
        status: 500,
        error,
      };
    });

  return response;
};

module.exports = { search };

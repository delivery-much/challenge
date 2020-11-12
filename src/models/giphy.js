const axios = require('axios');

const api = axios.create({
  baseURL: "http://api.giphy.com/v1/",
});

module.exports = {
 search (recipeTitle) {
    return api.get('gifs/search', {
      params: {
        q: recipeTitle,
        limit: 1,
        api_key: process.env.GIPHY_API_KEY
      }
    },
    {
      timeout: process.env.TIMEOUT_MS
    })
  }
}

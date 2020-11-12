const axios = require('axios');

const api = axios.create({
  baseURL: "http://www.recipepuppy.com",
});

module.exports = {
 search (keywords) {
    return api.get('/api', {
      params: {
        i: keywords.join(process.env.INGREDIENT_SPLITTER)
      }
    },
    {
      timeout: process.env.TIMEOUT_MS
    })
  }
}

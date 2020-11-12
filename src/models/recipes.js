const axios = require('axios');

const api = axios.create({
  baseURL: "http://www.recipepuppy.com",
});

module.exports = {
 async search (keywords) {
    return await api.get('/api', {
      params: {
        i: keywords.join(process.env.INGREDIENT_SPLITTER)
      }
    },
    {
      timeout: process.env.TIMEOUT_MS
    })
  }
}

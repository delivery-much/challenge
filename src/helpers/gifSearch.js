const axios = require('axios');
//const { response } = require('express');

module.exports = async function gifSearch(req) {
  return axios('http://api.giphy.com/v1/gifs/search	', {
    params: {
      api_key: 'JLcX9we4OQBTChf8CSAhkaHGY9xtdcFC',
      q: req,
      limit: 1,
    },
  }).then((response) => {
    const gifUrl = response.data.data[0].url;
    console.log(req + '=>' + gifUrl);
    return gifUrl;
  });
};

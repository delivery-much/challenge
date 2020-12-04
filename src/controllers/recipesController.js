const recipesRepo = require('../repositories/recipesRepository');
const giphyRepo = require('../repositories/giphyRepository');

exports.get = async (req, res, next) => {
  const { i } = req.query;

  if (!i) {
    return res.status(400).send({
      message: 'Insufficient data',
      status: 400,
    });
  }

  const iNoBlank = i.replace(/\s/g, '');
  const iArr = iNoBlank.split(',');

  if (!iArr || !iArr.length) {
    return res.status(400).send({
      message: 'Invalid data',
      status: 400,
    });
  }

  const iArrLength = iArr.length;

  if (iArrLength > 3) {
    return res.status(400).send({
      message: 'Invalid data. Please use less than 4 ingredients.',
      status: 400,
    });
  }

  const iArrSorted = iArr.sort();
  const iFormatted = iArrSorted.join(',');

  // Puppy Recipe
  const recipesDataObj = await recipesRepo.get(iFormatted);

  if (recipesDataObj.status >= 300) {
    return res.status(recipesDataObj.status).send(recipesDataObj);
  }

  const recipesData = recipesDataObj.data;
  const recipes = recipesData.results;

  // Formatting Recipes
  const recipesFormatted = await Promise.all(
    recipes.map(async (r) => {
      // GIPHY
      const giphyDataObj = await giphyRepo.search(r.title);
      const gif =
        giphyDataObj && giphyDataObj.status === 200
          ? `https://media.giphy.com/media/${giphyDataObj.data.data[0].id}/giphy.gif`
          : 'Not Found';

      return {
        title: r.title,
        ingredients: r.ingredients.replace(/\s/g, '').split(',').sort(),
        link: r.href,
        gif,
      };
    })
  );

  const recipesFormattedSorted = recipesFormatted.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );

  return res.status(200).send({
    keywords: iArrSorted,
    recipes: recipesFormattedSorted,
  });
};

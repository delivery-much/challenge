const recipesRepo = require('../repositories/recipesRepository');

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
  await recipesRepo.get(
    iFormatted,
    async (data) => {
      const recipesFormatted = await Promise.all(
        data.recipes.map((r) => {
          return {
            title: r.title,
            ingredients: r.ingredients.replace(/\s/g, '').split(',').sort(),
            link: r.href,
            gif: 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif',
          };
        })
      );

      return res.status(200).send({
        keywords: iArrSorted,
        recipes: recipesFormatted,
      });
    },
    (error) => {
      return res.status(500).send({
        message: 'Request failed',
        status: 500,
        error,
      });
    }
  );
};

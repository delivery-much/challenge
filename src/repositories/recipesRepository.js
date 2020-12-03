const recipePuppy = require('../utils/recipePuppy');

exports.getRecipes = async (ingredients) => {
  return await recipePuppy.get(ingredients);
};

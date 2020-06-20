module.exports = {
  async show(req, res, next) {
    const { ingredient_01, ingredient_02, ingredient_03 } = req.params;

    return res.json({ 
      ingredient_01, ingredient_02, ingredient_03
    });
  }
}
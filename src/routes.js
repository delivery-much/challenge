const express = require('express');

const RecipeController = require('./controllers/recipeControllers');

const routes = express.Router();

routes.get('/recipes', RecipeController.show);

module.exports = routes;

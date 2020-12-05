// Carregando dependências
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

// Instanciando express
const app = express();

// Carregando Rotas
const recipesRoutes = require('./routes/recipesRoutes');

// Usando BodyParser na aplicação
app.use(bodyParser.json({ limit: process.env.MAX_SIZE + 'mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitando CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  res.header('Access-Control-Allow-Headers', process.env.ALLOW_HEADERS);
  res.header('Access-Control-Allow-Methods', process.env.ALLOW_METHODS);
  next();
});

// Usando rotas na aplicação
app.use('/recipes', recipesRoutes);

// Exportando aplicação
module.exports = app;

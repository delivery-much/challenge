// DEPENDÊNCIAS
const express = require('express')
const Keywords = require('./models/keywords')
const app = express()
const port = 3000

// URL DE ENTRADA DAS RECEITAS
app.get('/recipes/', (req, res) => {
  console.log(`Recieving parameters ${req.query.i}`)

  // DIVIDE AS PALAVRAS-CHAVE E FILTRA CASO VENHA EM ALGUMA PALAVRA EM BRACO
  let keywords = Keywords.split(req.query.i);

  res.status(200).json({msg: keywords});
})

// FALLBACK PARA CASO SEJAM ENVIADOS REQUESTS COM OUTROS METODOS HTTP
app.all('/recipes/', (req, res) => {
  res.status(405).json({message: "Method not allowed"});
})

// FALLBACK PARA QUALQUER OUTRA URL NO SERVIDOR
app.all('*', (req, res) => {
  res.status(404).json({message: "Page not found"});
})

app.listen(port, () => {
  console.log('Program starting..');
})

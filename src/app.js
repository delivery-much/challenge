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

app.listen(port, () => {
  console.log('Program starting..');
})

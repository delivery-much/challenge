// DEPENDÊNCIAS
const express = require('express')
const app = express()
const port = 3000

// URL DE ENTRADA DAS RECEITAS
app.get('/recipes/', (req, res) => {
  res.status(200).json({msg: "Hello World"});
})

app.listen(port, () => {
  console.log('Program starting..');
})

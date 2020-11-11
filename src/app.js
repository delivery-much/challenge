// DEPENDÊNCIAS
const Keywords = require('./models/keywords')

// INICIA O EXPRESS
const express = require('express')
const app = express()

// INICIA O ARQUIVO DE CONFIGURAÇÃO
const dotenv = require('dotenv')
dotenv.config()

// URL DE ENTRADA DAS RECEITAS
app.get('/recipes/', (req, res) => {
  console.log(`Recieving parameters ${req.query.i}`)
  try {
    // DIVIDE AS PALAVRAS-CHAVE E FILTRA CASO VENHA EM ALGUMA PALAVRA EM BRACO
    let keywords = Keywords.split(req.query.i);

    res.status(200).json({msg: keywords});
  } catch (e) {
    // LOGA O ERRO NO CONSOLE E RETORNA O MESMO PARA O USUÁRIO
    console.error(e);
    // ADMINISTRA O HTTP STATUS CODE PARA SER O MESMO DO ERRO, CASO NÃO VENHA NENHUM CÓDIGO DE ERRO, JOGA ERRO DE SERVIDOR (500).
    res.status((e.code)?e.code:500).json({message: e.message});
  }
})

// FALLBACK PARA CASO SEJAM ENVIADOS REQUESTS COM OUTROS METODOS HTTP
app.all('/recipes/', (req, res) => {
  res.status(405).json({message: "Method not allowed"});
})

// FALLBACK PARA QUALQUER OUTRA URL NO SERVIDOR
app.all('*', (req, res) => {
  res.status(404).json({message: "Page not found"});
})

// ESCUTA A PORTA DEFINIDA NO .ENV
app.listen(process.env.PORT, () => {
  console.log('Program starting..');
})

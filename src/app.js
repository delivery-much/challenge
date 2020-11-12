// DEPENDÊNCIAS
const Keywords = require('./models/keywords')
const Recipes = require('./models/recipes')
const Giphy = require('./models/giphy')

// INICIA O EXPRESS
const express = require('express')
const app = express()

// INICIA O ARQUIVO DE CONFIGURAÇÃO
const dotenv = require('dotenv')
dotenv.config()

// URL DE ENTRADA DAS RECEITAS
app.get('/recipes/', async (req, res) => {
  console.log(`Recieving parameters ${req.query.i}`)
  try {
    // DIVIDE AS PALAVRAS-CHAVE E FILTRA CASO VENHA EM ALGUMA PALAVRA EM BRACO
    const keywords = Keywords.split(req.query.i);
    let recipes = [];

    // PROCURA PELAS PALAVRAS CHAVES
    const response = await Recipes.search(keywords)
    // LOGA O RESULTADO
    console.log(`${response.data.results.length} recipes were found!!`);

    // VERIFICA SE HÁ ALGUMA RESPOSTA
    if(response.data.results.length === 0) {
        let error = new Error('No recipes were found');
        error.code = 404;
        throw error;
    }

    // PARA CADA RESULTADO VINDO, PROCURA UM GIF ADEQUADO
    const giphys = response.data.results.map(async ({title, ingredients, href}) => {
      console.log(`${title.trim()} searching for gifs...`);
      // AGUARDA A CAPTURA DOS GIPHYS NA API
      await Giphy.search(title).then((result) => {
        // PARA CADA GIPHY RETORNADO
        result.data.data.map(({url}) => {
          // COLOCA NO ARRAY DE RECEITAS
          recipes.push({title, ingredients, link: href, gif: url});
          // LOGA
          console.log(`Pushing ${title.trim()} to recipes array`);
        })
      })
    })

    // AGUARDA TODOS OS GIPHYS SEREM PEGOS, E ENTÃO RETORNA OS DADOS
    Promise.all(giphys).then((completed) => {
      // LOGA
      console.log(`All requests were completed, returning ${recipes.length} recipes`)
      // QUANDO OBTIVER A RESPOSTA PROSSEGUE.
      res.json({keywords, recipes});
    })

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

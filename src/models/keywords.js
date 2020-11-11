// NESSE MÓDULO PODEM SER TRABALHADAS COISAS COMO:
// BLACKLIST - KEYWORDS PROIBIDAS.
// MÉTRICAS - MEDIR QUAIS KEYWORDS SÃO MAIS UTILIZADAS.
// DATAWRANGLING - CASO NECESSITE PARA ANÁLISE DE DADOS.
// REMOVER INGREDIENTES IGUAIS.
// ENTRE OUTROS ASPECTOS.

// INICIA O ARQUIVO DE CONFIGURAÇÃO
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  split (i) {
    // PEGA DO .ENV QUAL A STRING UTILIZADA PARA SEPARAR OS INGREDIENTES, CASO UM DIA MUDE. "," É O PADRÃO.
    let ingredients = i.split(process.env.INGREDIENT_SPLITTER);
    ingredients = ingredients.filter(elem => elem !== '');

    // CONFERE SE A QUANTIDADE DE INGREDIENTES ENVIADOS É COMPATÍVEL COM A QUANTIDADE DE INGREDIENTES PERMITIDOS NO .ENV
    if(ingredients.length > process.env.INGREDIENT_BATCH_SIZE) {
        console.log('Ingredient batch size limit reached');
        let error = new Error(`Ingredient batch limit is ${process.env.INGREDIENT_BATCH_SIZE}`);
        error.code = 400;
        throw error;
    }

    return ingredients;
  }
}

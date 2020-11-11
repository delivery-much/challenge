// NESSE MÓDULO PODEM SER TRABALHADAS COISAS COMO:
// BLACKLIST - KEYWORDS PROIBIDAS.
// MÉTRICAS - MEDIR QUAIS KEYWORDS SÃO MAIS UTILIZADAS.
// DATAWRANGLING - CASO NECESSITE PARA ANÁLISE DE DADOS.
// ENTRE OUTROS ASPECTOS.

// CONSTANTE DO PARAMETRO QUE SERÁ USADO PARA SEPARAR AS KEYWORDS
const splitter = ',';
const ingredientBactchSize = 3;

module.exports = {
  split (i) {
    let ingredients = i.split(splitter);
    ingredients = ingredients.filter(elem => elem !== '');

    if(ingredients.length > ingredientBactchSize) {
        console.log('Ingredient batch size limit reached');
        let error = new Error(`Ingredient batch limit is ${ingredientBactchSize}`);
        error.code = 400;
        throw error;
    }

    return ingredients;
  }
}

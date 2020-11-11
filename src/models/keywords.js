// NESSE MÓDULO PODEM SER TRABALHADAS COISAS COMO:
// BLACKLIST - KEYWORDS PROIBIDAS.
// MÉTRICAS - MEDIR QUAIS KEYWORDS SÃO MAIS UTILIZADAS.
// DATAWRANGLING - CASO NECESSITE PARA ANÁLISE DE DADOS.
// ENTRE OUTROS ASPECTOS.

// CONSTANTE DO PARAMETRO QUE SERÁ USADO PARA SEPARAR AS KEYWORDS
const splitter = ','

module.exports = {
  split (i) {
    let ingredients = i.split(splitter);
    return ingredients.filter(elem => elem !== '');
  }
}

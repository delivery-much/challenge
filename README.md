# Delivery Much Tech Challenge

Api construida para o Delivery Much Tech Challenge que recebe como parametro uma lista de nomaximo três ingredientes na lingua inglesa como parâmetro de entrada em uma chamada GET e retorna uma lista de receitas, contendo os seus ingredientes, um link para a receita completa, e um gif relacionado ao nome da receita. Para sua elaboração foram utilizadas as APIs públicas da RecipePuppy (http://www.recipepuppy.com/about/api/) e da Giphy (https://developers.giphy.com/docs/) para obter os dados necessários.

## Aplicação

### Pré-Requisitos:

```
* Node JS
```

Os requisitos de funcionamento do sistema é possuir o Node.js instalado em sua máquina. Você pode fazer o download aqui: https://nodejs.org/en/ Verifique pelo terminal se o Node.js foi instalado com sucesso pelo comando: node -v

### Tecnologias Utilizadas:

```
* Node JS
* Javascript
* Docker
```

### Instalação

Faça o download ou clone do repositorio para p diretório desejado. No terminal, abra o caminho até o arquivo e rode os comandos a seguir para instalar as dependencias do projeto;

```
$ npm install
```

### Iniciando a Aplicação
```
$ npm start
```


Após estar com a aplicação rodando, você pode acessar a aplicação pelo navegador ou pela API REST Client de sua preferencia (ex: Insomnia, Postman, etc.) utilizando a seguinte chamada:


`http://localhost:3030/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}`

Exemplo:

`http://localhost:3030/recipes/?i=onion,tomato`


A resposta da requisição deve seguir a seguinte estrutura:

```
{
	"keywords": ["onion", "tomato"],
	"recipes": [{
		"title": "Greek Omelet with Feta",
		"ingredients": ["eggs", "feta cheese", "garlic", "red onions", "spinach", "tomato", "water"],
		"link": "http://www.kraftfoods.com/kf/recipes/greek-omelet-feta-104508.aspx",
		"gif": "https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif"
	   },{
		"title": "Guacamole Dip Recipe",
		"ingredients": ["avocado", "onions", "tomato"],
		"link":"http://cookeatshare.com/recipes/guacamole-dip-2783",
		"gif":"https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif"
	   }
	]
}
```

### Docker

Para rodar a aplicação a partir do docker você precisar ter o docker instalado em sua maquina, e rodar um dos comandos a seguir na pasta onde você baixou ou clonou o repositório;

#### Docker-Compose
```
docker-compose up
```
#### Docker
```
docker run -p 3030:3030 -d thiagopanchi/challenge
```

Após estar com a aplicação rodando no docker, você pode acessar a aplicação pelo navegador ou pela API REST Client de sua preferencia (ex: Insomnia, Postman, etc.) utilizando a seguinte chamada, onde o HOST é o ip onde o Docker está rodando:


`http://{HOST}:3030/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}`

# Delivery Much Tech Challenge

#### A Estrutura

A API possui apenas um endpoint, que respeita a chamada:

`http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}`

Exemplo:

`http://127.0.0.1/recipes/?i=onion,tomato`


A resposta dessa requisição segue a seguinte estrutura:

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

### Requisitos Entregues

- NodeJS + Express
- Dotenv para configuração de ambiente;
- O título da receita é utilizado para selecionar um Giphy, caso não seja encontrado nenhum, a receita é retornada sem Giphy;
- Os ingredientes são tratados e ordenados por ordem alfabética.
- Todo erro é tratado em Try-Catch.
- O projeto utiliza docker-compose;

### Instalação

O projeto utiliza [docker-compose](https://docs.docker.com/compose/install/), para utilizá-lo, basta seguir os comandos abaixo:
```
$ docker-compose build
$ docker-compose up -d
```

Caso não deseje utilizar o Docker, pode rodar o projeto utilizando o NPM.
```
$ npm install
$ npm run dev
```

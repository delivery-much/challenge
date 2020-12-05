# Delivery Much Tech Challenge

Bem vindo(a)! Esse é o Delivery Much Tech Challenge.

Cristiano Carvalho Modesto
Versão 1.0
04/12/2020

### .gitignore

O arquivo .env deve ser preenchido com os seguintes campos

```
PORT_SERVER= Porta em que a API deve rodar
HOST_SERVER= IP Host do Servidor
MAX_SIZE= Tamanho máximo de fluxo de dados em megabytes

ALLOW_ORIGIN= CORS ORIGIN
ALLOW_HEADERS= CORS HEADER
ALLOW_METHODS= CORS METHODS

RECIPE_PUPPY_API=http://www.recipepuppy.com/api

GIPHY_API=https://api.giphy.com/v1/gifs/search?limit=1&offset=0&rating=g&lang=en
GIPHY_KEY= Chave de acesso a API do GIPHY
```

### Baixar dependências

npm i

### Rodar projeto com Docker

docker run -p 49160:8080 -d cristiano/deliverymuch

### Pegar o ID do Container Docker

docker ps

### Listar Containers Docker

docker images

### Print de logs do Container Docker

docker logs <container id>

### Entrar no Container Docker

docker exec -it <container id> /bin/bash

### Rodar Testes Unitários

npm run test

### Rodar Projeto Local

npm run dev

### API Estrutura

A API possui apenas um endpoint, que deve respeitar a seguinte chamada:

`http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}`

Exemplo:

`http://127.0.0.1/recipes/?i=onion,tomato`

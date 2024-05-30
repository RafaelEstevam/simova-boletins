# Recados.IO - Backend

Backend da aplicação Recados.IO. Desenvolvido em Typescript e tecnologias relacionadas como Express, Mongo DB, etc.

## Backend Online

O backend está disponível em: https://simova-boletins.onrender.com/

Devido ao serviço gratuito, ele pode apresentar certa instabilidade.

## Setup do projeto

Rode o comando:

```
npm install
```

## Rodando o projeto

Depois das configurações execute o seguinte comando:

```
npm run dev
```

Esse comando irá iniciar o backend da aplicação no endereço http://localhost:3000

## Rotas disponíveis no backend

As rotas disponíveis no backend são:

- GET - '/' : "Hello world";
- GET - '/employees?name=<nome-do-funcionario>&active=<'true'||'false'>' : Retorna a lista de todos os funcionários;
- GET - '/employees/:id' (id: Id do funcionário) : Retorna os dados do funcionário de acordo com ID;
- GET - '/bulletins?name=<nome-do-funcionario>&totalHours=<total-de-horas>' : Retorna a lista de todos os boletins;
- GET - '/bulletins/employees/:id' : Retorna os boletins de acordo com o ID do funcionário;
- GET - '/appointments' : Retorna todas as atividades;
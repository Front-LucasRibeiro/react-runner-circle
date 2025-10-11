# React + Vite
Projeto inicializado com Vite + React + TypeScript, com foco em estudos de GraphQL e REST.

---------------------------------------------------------------------------------------------

## GraphQL

- Não trabalha com verbos HTTP
- Trabalha com queries e mutations

- Nas mutations, passamos via parametros os dados que queremos alterar ou criar, e selecionamos os campos que queremos receber na resposta.
- Mutations são funções que retornam objetos.

```graphql
mutation {
  createUser(name: "Lucas", email: "lucas@email.com") {
    id
    name
    email
  }
}
```

## Apollo Client
- Biblioteca para consumir APIs GraphQL, gerenciar estado local e remoto
- Utilização declarativa

```bash
npm i @apollo/client graphql
```




---------------------------------------------------------------------------------------------

## REST

- Trabalha com verbos HTTP (GET, POST, PUT, DELETE)
- Trabalha com recursos (users, products, orders)

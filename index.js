const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// receitas is an array that should be imported from receitas.json file
// const receitas = require('./receitas.json');

const receitas = require('./receitas.json').map(receita => ({
  ...receita,
  id: parseInt(receita.id)
}));

// GraphQL
const { buildSchema } = require("graphql");
const { createHandler } = require('graphql-http/lib/use/express');

const schema = buildSchema(`
  type Receita {
    id: ID
    nome: String
    descricao: String
    categorias: [String]
    imagem: String
    ingredientes: [Ingrediente]
    preparo: [String]
    dicas: String
    harmonizacao: [String]
    tempo: Int
  }

  type Ingrediente {
    nome: String
    quantidade: Int
    unidade: String
    preposicao: String
  }

  type Query {
    receita(id: ID!): Receita
    receitas: [Receita]
  }
`);

const resolvers = {
  receita({ id }) {
    return receitas.find(item => item.id === Number(id));
  },
  receitas() {
    console.log("Query for receitas called");
    return receitas;
  },
};

app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })

);

app.listen(3000);
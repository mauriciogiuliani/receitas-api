const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

require('dotenv').config();

const cors = require('cors');
app.use(cors());


const arguments = process.argv.slice(2);
if (arguments[0]) {
  process.env.RECEITAS_JSON = arguments[0];
}
const receitas = require(process.env.RECEITAS_JSON).map(receita => ({
  ...receita
}));

// GraphQL
const { buildSchema } = require("graphql");
const { createHandler } = require('graphql-http/lib/use/express');

const schema = buildSchema(`
  type Receita {
    id: ID
    nome: String
    titulo: String
    descricao: String
    categorias: [String]
    imagem: String
    ingredientes: [Ingrediente]
    preparo: [String]
    dicas: String
    harmonizacao: [Harmonizacao]
    tempo: Int
    porcao: Porcao
  }

  type Ingrediente {
    nome: String
    quantidade: Int
    unidade: String
    preposicao: String
  }

  type Harmonizacao {
    categoria: String
    subcategoria: String
    descricao: String
  }

  type Porcao {
    tipo: String 
    quantidade: Int
  }


  type Query {
    receita(id: ID!): Receita
    receitaByNome(nome: String!): Receita
    receitas: [Receita]
  }

`);

const resolvers = {
  receita({ id }) {
    return receitas.find(item => item.id === id);
  },
  receitas() {
    console.log("Query for receitas called");
    return receitas;
  },

  receitasByNome({ nome }) {
    console.log("Query for receitasByNome called");
    return receitas.find(item => item.nome === nome);
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


/* REST */

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.post('/receitas', (req, res) => {
  receitas.push(req.body);

  const updatedJson = JSON.stringify(receitas, null, 2);

  // Write the updated data back to the file
  fs.writeFile(process.env.RECEITAS_JSON, updatedJson, 'utf8', (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log("Object added and file saved successfully.");
  });

  res.send('POST receitas');
});

app.listen(3000);
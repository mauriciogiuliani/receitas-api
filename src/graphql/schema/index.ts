const { readFileSync } = require("fs");

const ReceitasTypeDefs = readFileSync("./src/graphql/types/receitas.graphql", "utf8");
const CategoriasTypeDefs = readFileSync("./src/graphql/types/categorias.graphql", "utf8");

export const typeDefs = `
  ${ReceitasTypeDefs}
  ${CategoriasTypeDefs}
  `;

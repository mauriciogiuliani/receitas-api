import { makeExecutableSchema } from "graphql-tools";
import { createHandler } from "graphql-http/lib/use/express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export function handler() {
  return createHandler({ schema: schema });
}

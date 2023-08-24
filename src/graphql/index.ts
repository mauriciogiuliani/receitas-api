
import { createHandler } from "graphql-http/lib/use/express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export function handler() {
  return createHandler({ schema: schema });
}

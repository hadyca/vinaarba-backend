require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: false,
    introspection: false,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await apollo.start();
  const app = express();

  app.use(logger("tiny"));
  app.use(graphqlUploadExpress({ maxFieldSize: 1000000 }));
  apollo.applyMiddleware({ app, path: "/" });

  const httpServer = http.createServer(app);

  httpServer.listen(PORT || 4000, () => {
    console.log(`🚀 Server is running http://localhost:${PORT}`);
  });
}
startServer();

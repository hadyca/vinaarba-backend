require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
<<<<<<< HEAD
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
=======
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
>>>>>>> d57024952b19fcfa0aa63ba07214945d82192d03

const PORT = process.env.PORT;
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    upload: false,
    typeDefs,
    resolvers,
<<<<<<< HEAD
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
=======
    playground: false,
    introspection: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
>>>>>>> d57024952b19fcfa0aa63ba07214945d82192d03
  });

  await apollo.start();
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      },
    })
  );
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress({ maxFieldSize: 1000000 }));
  httpServer.listen(PORT || 4000, () => {
    console.log(`🚀 Server is running http://localhost:${PORT}/`);
  });
}
startServer();

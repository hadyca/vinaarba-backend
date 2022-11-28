require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { graphqlUploadExpress } from "graphql-upload";
import { typeDefs, resolvers } from "./schema";
import cors from "cors";
import bodyParser from "body-parser";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    upload: false,
    typeDefs,
    resolvers,
    playground: false,
    introspection: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // context: async ({ req }) => {
    //   return {
    //     loggedInUser: await getUser(req.headers.token),
    //   };
    // },
  });

  await apollo.start();
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
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
  // apollo.applyMiddleware({ app });

  httpServer.listen(PORT || 4000, () => {
    console.log(`🚀 Server is running http://localhost:${PORT}/`);
  });
}
startServer();

require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
const PORT = process.env.PORT;

async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true, // 추가
    introspection: true, // 추가
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await apollo.start();
  const app = express();

  app.use(logger("tiny"));
  // app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  httpServer.listen(PORT || 4000, () => {
    console.log(`🚀 Server is running http://localhost:${PORT}/graphql ✅`);
  });
}
startServer();

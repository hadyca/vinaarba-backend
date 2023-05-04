import { redisCli } from "../../redis";

export default {
  Mutation: {
    confirmSecret: (_, { email, secret }) => {
      const redisSecret = redisCli.get(email);
      if (!redisSecret) {
        return {
          ok: false,
          error: "100",
        };
      }
      if (redisSecret !== secret) {
        return {
          ok: false,
          error: "200",
        };
      }
      if (redisSecret === secret) {
        return {
          ok: true,
        };
      }
    },
  },
};

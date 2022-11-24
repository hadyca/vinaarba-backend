import { redisCli } from "../../redis";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      const redisSecret = await redisCli.get(email);

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

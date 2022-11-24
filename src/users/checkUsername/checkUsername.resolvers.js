import client from "../../client";

export default {
  Mutation: {
    checkUsername: async (_, { username }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (user) {
          return {
            ok: false,
            error: "100",
          };
        }
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

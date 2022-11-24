import client from "../../client";

export default {
  Mutation: {
    getPushToken: async (_, { userId, pushToken }) => {
      const user = await client.user.findFirst({ where: { id: userId } });
      if (!user) {
        return {
          ok: false,
          error: "User does not exist.",
        };
      }
      await client.pushToken.create({
        data: {
          pushToken,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return {
        ok: true,
        pushToken,
      };
    },
  },
};

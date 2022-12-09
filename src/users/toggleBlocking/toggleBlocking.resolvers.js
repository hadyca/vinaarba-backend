import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    toggleBlocking: protectedResolver(
      async (_, { userId }, { loggedInUser }) => {
        try {
          const existingUser = await client.user.findUnique({
            where: {
              id: userId,
            },
          });
          if (!existingUser) {
            throw new Error("100");
          }
          const user = await client.user.findFirst({
            where: {
              id: loggedInUser.id,
              blocking: {
                some: { id: userId },
              },
            },
          });
          if (user) {
            const updatedUser = await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                blocking: {
                  disconnect: {
                    id: userId,
                  },
                },
              },
            });
            return updatedUser;
          } else {
            const updatedUser = await client.user.update({
              where: {
                id: loggedInUser.id,
              },
              data: {
                blocking: {
                  connect: {
                    id: userId,
                  },
                },
              },
            });
            return updatedUser;
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateLanguage: protectedResolver(
      async (_, { language }, { loggedInUser }) => {
        try {
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser.id,
            },
          });

          if (!user) {
            return {
              ok: false,
              error: "User is not exist.",
            };
          }
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              language,
            },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

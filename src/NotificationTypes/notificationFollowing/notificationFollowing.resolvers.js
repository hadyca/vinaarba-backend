import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    notificationFollowing: protectedResolver(
      async (_, { state }, { loggedInUser }) => {
        try {
          await client.notificationType.update({
            where: {
              userId: loggedInUser.id,
            },
            data: {
              following: state,
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

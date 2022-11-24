import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    notificationUserPostLike: protectedResolver(
      async (_, { state }, { loggedInUser }) => {
        try {
          await client.notificationType.update({
            where: {
              userId: loggedInUser.id,
            },
            data: {
              userPostLike: state,
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

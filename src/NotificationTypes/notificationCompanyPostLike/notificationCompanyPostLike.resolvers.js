import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    notificationCompanyPostLike: protectedResolver(
      async (_, { state }, { loggedInUser }) => {
        try {
          await client.notificationType.update({
            where: {
              userId: loggedInUser.id,
            },
            data: {
              companyPostLike: state,
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

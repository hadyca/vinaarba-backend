import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeNotificationTypeState: protectedResolver(
      async (_, __, { loggedInUser }) => {
        try {
          const notification = await client.notificationType.findUnique({
            where: {
              userId: loggedInUser.id,
            },
          });
          return notification;
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

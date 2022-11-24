import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeAllNotification: protectedResolver(
      async (_, { offset }, { loggedInUser }) => {
        const notifications = await client.notification.findMany({
          where: {
            receiverId: loggedInUser.id,
          },
          include: {
            user: true,
          },
          take: 20,
          skip: offset,
          orderBy: {
            createdAt: "desc",
          },
        });
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            alertStatus: false,
          },
        });
        return notifications;
      }
    ),
  },
};

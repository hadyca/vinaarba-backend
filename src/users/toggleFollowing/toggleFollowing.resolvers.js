import client from "../../client";
import { sendPushMsg } from "../../utils";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    toggleFollowing: protectedResolver(
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
              following: {
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
                following: {
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
                following: {
                  connect: {
                    id: userId,
                  },
                },
              },
            });
            const existNotification = await client.notificationType.findFirst({
              where: {
                userId,
              },
            });
            if (existNotification.following) {
              const msg =
                existingUser.language === "vn"
                  ? "đã theo dõi bạn!"
                  : existingUser.language === "en"
                  ? "followed you!"
                  : "님이 회원님을 Following 했어요!";
              await sendPushMsg(
                existingUser.id,
                loggedInUser.id,
                loggedInUser.username,
                3,
                msg,
                _,
                "following"
              );
            }
            return updatedUser;
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

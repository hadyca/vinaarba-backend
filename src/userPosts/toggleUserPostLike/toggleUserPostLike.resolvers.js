import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    toggleUserPostLike: protectedResolver(
      async (_, { userPostId }, { loggedInUser }) => {
        const post = await client.userPost.findUnique({
          where: {
            id: userPostId,
          },
        });
        if (!post) {
          throw new Error("100");
        }
        const likeWhere = {
          userId_userPostId: {
            userId: loggedInUser.id,
            userPostId,
          },
        };
        const like = await client.userPostLike.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.userPostLike.delete({
            where: likeWhere,
          });
          return {
            ok: true,
          };
        } else {
          await client.userPostLike.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              userPost: {
                connect: {
                  id: userPostId,
                },
              },
            },
          });

          const postUser = await client.user.findUnique({
            where: {
              id: post.userId,
            },
          });

          const existNotification = await client.notificationType.findFirst({
            where: {
              userId: postUser.id,
            },
          });

          if (existNotification.userPostLike) {
            const msg =
              postUser.language === "vn"
                ? "đã để lại ❤ vào bài viết của bạn!"
                : postUser.language === "en"
                ? "marked ❤ in your post!"
                : "님이 회원님의 글에 ❤를 남겼어요!";
            await sendPushMsg(
              postUser.id,
              loggedInUser.id,
              loggedInUser.username,
              1,
              msg,
              userPostId,
              "userPost"
            );
          }
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

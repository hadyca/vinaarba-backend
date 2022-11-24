import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    toggleCompanyPostLike: protectedResolver(
      async (_, { companyPostId }, { loggedInUser }) => {
        const post = await client.companyPost.findUnique({
          where: {
            id: companyPostId,
          },
        });
        if (!post) {
          throw new Error("100");
        }
        const likeWhere = {
          userId_companyPostId: {
            userId: loggedInUser.id,
            companyPostId,
          },
        };
        const like = await client.companyPostLike.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.companyPostLike.delete({
            where: likeWhere,
          });
          return {
            ok: true,
          };
        } else {
          await client.companyPostLike.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              companyPost: {
                connect: {
                  id: companyPostId,
                },
              },
            },
          });

          const company = await client.company.findUnique({
            where: {
              id: post.companyId,
            },
          });

          const postUser = await client.user.findUnique({
            where: {
              id: company.userId,
            },
          });
          const existNotification = await client.notificationType.findFirst({
            where: {
              userId: postUser.id,
            },
          });
          if (existNotification.companyPostLike) {
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
              companyPostId,
              "companyPost"
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

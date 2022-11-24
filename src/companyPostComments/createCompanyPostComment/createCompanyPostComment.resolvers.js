import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    createCompanyPostComment: protectedResolver(
      async (_, { companyPostId, payload }, { loggedInUser }) => {
        const post = await client.companyPost.findUnique({
          where: {
            id: companyPostId,
          },
        });
        if (!post) {
          throw new Error("100");
        }

        const newComment = await client.companyPostComment.create({
          data: {
            payload,
            companyPost: {
              connect: {
                id: companyPostId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
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
        if (existNotification.companyPostComment) {
          const msg =
            postUser.language === "vn"
              ? "đã bình luận vào bài viết của bạn!"
              : postUser.language === "en"
              ? "commented on your post!"
              : "님이 회원님의 글에 댓글을 남겼어요.";
          await sendPushMsg(
            postUser.id,
            loggedInUser.id,
            loggedInUser.username,
            2,
            msg,
            companyPostId,
            "companyPost"
          );
        }
        return newComment;
      }
    ),
  },
};

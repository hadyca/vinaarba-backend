import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    createCompanyPostReComment: protectedResolver(
      async (_, { companyPostCommentId, payload }, { loggedInUser }) => {
        const comment = await client.companyPostComment.findUnique({
          where: {
            id: companyPostCommentId,
          },
        });
        if (!comment) {
          throw new Error("100");
        }

        const newComment = await client.companyPostReComment.create({
          data: {
            payload,
            companyPostComment: {
              connect: {
                id: companyPostCommentId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        const companyPost = await client.companyPost.findUnique({
          where: {
            id: comment.companyPostId,
          },
        });

        const company = await client.company.findUnique({
          where: {
            id: companyPost.companyId,
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
            companyPost.id,
            "companyPost"
          );
        }
        return newComment;
      }
    ),
  },
};

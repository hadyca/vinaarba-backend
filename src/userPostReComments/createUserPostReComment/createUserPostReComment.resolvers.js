import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    createUserPostReComment: protectedResolver(
      async (_, { userPostCommentId, payload }, { loggedInUser }) => {
        const comment = await client.userPostComment.findUnique({
          where: {
            id: userPostCommentId,
          },
        });
        if (!comment) {
          throw new Error("100");
        }

        const newComment = await client.userPostReComment.create({
          data: {
            payload,
            userPostComment: {
              connect: {
                id: userPostCommentId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        const userPost = await client.userPost.findUnique({
          where: {
            id: comment.userPostId,
          },
        });

        const postUser = await client.user.findUnique({
          where: {
            id: userPost.userId,
          },
        });
        const existNotification = await client.notificationType.findFirst({
          where: {
            userId: postUser.id,
          },
        });
        if (existNotification.userPostComment) {
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
            userPost.id,
            "userPost"
          );
        }
        return newComment;
      }
    ),
  },
};

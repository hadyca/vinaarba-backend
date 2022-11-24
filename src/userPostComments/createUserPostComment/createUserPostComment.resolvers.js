import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { sendPushMsg } from "../../utils";

export default {
  Mutation: {
    createUserPostComment: protectedResolver(
      async (_, { userPostId, payload }, { loggedInUser }) => {
        const post = await client.userPost.findUnique({
          where: {
            id: userPostId,
          },
        });
        if (!post) {
          throw new Error("100");
        }

        const newComment = await client.userPostComment.create({
          data: {
            payload,
            userPost: {
              connect: {
                id: userPostId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
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
            userPostId,
            "userPost"
          );
        }
        return newComment;
      }
    ),
  },
};

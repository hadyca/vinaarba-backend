import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteUserPostComment: protectedResolver(
      async (_, { commentId }, { loggedInUser }) => {
        const comment = await client.userPostComment.findUnique({
          where: {
            id: commentId,
          },
          select: {
            userId: true,
            _count: {
              select: { userPostReComments: true },
            },
          },
        });

        if (!comment) {
          return {
            ok: false,
            error: "코멘트를 찾을 수 없습니다.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "권한이 없습니다.",
          };
        } else {
          await client.userPostComment.delete({
            where: {
              id: commentId,
            },
          });
          return {
            ok: true,
            totalRecomments: comment._count.userPostReComments,
          };
        }
      }
    ),
  },
};

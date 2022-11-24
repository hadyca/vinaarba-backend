import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteUserPostReComment: protectedResolver(
      async (_, { reCommentId }, { loggedInUser }) => {
        const comment = await client.userPostReComment.findFirst({
          where: {
            id: reCommentId,
          },
          select: {
            userId: true,
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
          await client.userPostReComment.delete({
            where: {
              id: reCommentId,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

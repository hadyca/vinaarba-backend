import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCompanyPostComment: protectedResolver(
      async (_, { commentId }, { loggedInUser }) => {
        const comment = await client.companyPostComment.findUnique({
          where: {
            id: commentId,
          },
          select: {
            userId: true,
            _count: {
              select: { companyPostReComments: true },
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
          await client.companyPostComment.delete({
            where: {
              id: commentId,
            },
          });
          return {
            ok: true,
            totalRecomments: comment._count.companyPostReComments,
          };
        }
      }
    ),
  },
};

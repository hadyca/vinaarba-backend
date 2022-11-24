import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    userPostCommentReport: protectedResolver(
      async (_, { userPostCommentId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.userPostComment.findUnique({
            where: {
              id: userPostCommentId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.userPostCommentReport.create({
            data: {
              reason,
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
          return {
            ok: true,
            id: newReport.id,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

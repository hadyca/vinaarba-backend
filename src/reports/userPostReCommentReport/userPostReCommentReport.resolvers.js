import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    userPostReCommentReport: protectedResolver(
      async (_, { userPostReCommentId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.userPostReComment.findUnique({
            where: {
              id: userPostReCommentId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.userPostReCommentReport.create({
            data: {
              reason,
              userPostReComment: {
                connect: {
                  id: userPostReCommentId,
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

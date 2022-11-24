import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    companyPostCommentReport: protectedResolver(
      async (_, { companyPostCommentId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.companyPostComment.findUnique({
            where: {
              id: companyPostCommentId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.companyPostCommentReport.create({
            data: {
              reason,
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

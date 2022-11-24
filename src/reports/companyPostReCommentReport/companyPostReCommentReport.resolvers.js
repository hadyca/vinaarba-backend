import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    companyPostReCommentReport: protectedResolver(
      async (_, { companyPostReCommentId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.companyPostReComment.findUnique({
            where: {
              id: companyPostReCommentId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.companyPostReCommentReport.create({
            data: {
              reason,
              companyPostReComment: {
                connect: {
                  id: companyPostReCommentId,
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

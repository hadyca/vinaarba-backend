import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    companyPostReport: protectedResolver(
      async (_, { companyPostId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.companyPost.findUnique({
            where: {
              id: companyPostId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.companyPostReport.create({
            data: {
              reason,
              companyPost: {
                connect: {
                  id: companyPostId,
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

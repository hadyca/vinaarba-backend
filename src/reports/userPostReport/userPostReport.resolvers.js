import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    userPostReport: protectedResolver(
      async (_, { userPostId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.userPost.findUnique({
            where: {
              id: userPostId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }
          const newReport = await client.userPostReport.create({
            data: {
              reason,
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

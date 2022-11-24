import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    userReport: protectedResolver(
      async (_, { userId, reason }, { loggedInUser }) => {
        try {
          const ok = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!ok) {
            throw new Error("100");
          }

          const newReport = await client.userReport.create({
            data: {
              reason,
              FromUser: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ToUser: {
                connect: {
                  id: userId,
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

import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            id: loggedInUser.id,
          },
        });
        if (!user) {
          throw new Error("100");
        } else {
          return user;
        }
      } catch (error) {
        return error;
      }
    }),
  },
};

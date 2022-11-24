import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    deletePushToken: protectedResolver(async (_, { pushToken }) => {
      const exist = await client.pushToken.findFirst({
        where: { pushToken },
      });
      if (!exist) {
        return {
          ok: false,
          error: "push token does not exist.",
        };
      }
      await client.pushToken.delete({
        where: {
          pushToken,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

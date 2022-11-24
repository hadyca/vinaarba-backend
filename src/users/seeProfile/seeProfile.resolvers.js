import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { userId }) => {
      try {
        const user = client.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new Error("100");
        } else {
          return user;
        }
      } catch (error) {
        return error;
      }
    },
  },
};

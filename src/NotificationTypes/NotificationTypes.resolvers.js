import client from "../client";

export default {
  NotificationType: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: { id: userId },
      });
    },
  },
};

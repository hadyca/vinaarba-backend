import client from "../client";

export default {
  Company: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: { id: userId },
      });
    },
    isMyCompany: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (loggedInUser.myCompany === null) {
        return false;
      }
      return id === loggedInUser.myCompany.id;
    },
  },
};

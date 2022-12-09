import client from "../../client";

export default {
  Query: {
    seeBlocking: (_, { offset }, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } }).blocking({
        take: 15,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};

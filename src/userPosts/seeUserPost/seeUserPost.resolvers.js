import client from "../../client";

export default {
  Query: {
    seeUserPost: async (_, { userPostId }) => {
      try {
        const post = await client.userPost.findUnique({
          where: { id: userPostId },
        });
        if (!post || post.deleted) {
          throw new Error("100");
        } else {
          return post;
        }
      } catch (error) {
        return error;
      }
    },
  },
};

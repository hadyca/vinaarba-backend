import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    contact: protectedResolver(
      async (_, { type, content, email }, { loggedInUser }) => {
        try {
          const newContact = await client.contact.create({
            data: {
              type,
              content,
              email,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
          return {
            ok: true,
            id: newContact.id,
          };
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

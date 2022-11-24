import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { email, password, pushToken, language }) => {
      try {
        const user = await client.user.findUnique({ where: { email } });
        if (!user) {
          return {
            ok: false,
            error: "200",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "200",
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        const existPushToken = await client.pushToken.findUnique({
          where: {
            pushToken,
          },
        });
        if (existPushToken) {
          await client.pushToken.delete({
            where: {
              pushToken,
            },
          });
        }
        await client.pushToken.create({
          data: {
            pushToken,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            language,
          },
        });
        return {
          ok: true,
          token,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

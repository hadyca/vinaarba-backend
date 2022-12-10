import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redisCli } from "../../redis";

export default {
  Mutation: {
    finalStepAccount: async (
      _,
      { password, email, username, language, pushToken }
    ) => {
      try {
        const uglyPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            email,
            username,
            password: uglyPassword,
            language,
          },
        });

        await client.notificationType.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        await redisCli.del(email);
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

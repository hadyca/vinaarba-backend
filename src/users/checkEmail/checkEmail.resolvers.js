import client from "../../client";
import { redisCli } from "../../redis";
import { generateSecret, sendSecretMail, sendSMS } from "../../utils";

export default {
  Mutation: {
    checkEmail: async (_, { language, email }) => {
      try {
        const user = await client.user.findUnique({
          where: {
            email,
          },
        });
        if (user) {
          return {
            ok: false,
            error: "100",
          };
        } else {
          const loginSecret = generateSecret(111111, 999999);
          await sendSecretMail(language, email, loginSecret);
          await redisCli.set(email, loginSecret);
          await redisCli.expire(email, 180);
          // await sendSMS(language, countryCode, phoneNumber, loginSecret); //추 후 문자 인증시사용
          return {
            ok: true,
          };
        }
      } catch (error) {
        return error;
      }
    },
  },
};

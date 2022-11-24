import { redisCli } from "../../redis";
import { generateSecret, sendSecretMail, sendSMS } from "../../utils";

export default {
  Mutation: {
    requestSecret: async (_, { language, email }) => {
      try {
        const loginSecret = generateSecret(111111, 999999);
        await sendSecretMail(language, email, loginSecret);
        // await sendSMS(language, countryCode, phoneNumber, loginSecret); //추 후 문자 인증 시 구현
        await redisCli.set(email, loginSecret);
        await redisCli.expire(email, 60 * 3);
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
};

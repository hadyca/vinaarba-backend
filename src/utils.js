import nodemailer from "nodemailer";
import { Expo } from "expo-server-sdk";
import client from "./client";

export const generateSecret = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  return String(randomNumber);
};
const sendMail = (email) => {
  const options = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  };
  const nodemailerMailgun = nodemailer.createTransport(options);
  return nodemailerMailgun.sendMail(email, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Response: ${info}`);
    }
  });
};

export const sendSecretMail = (language, address, loginSecret) => {
  const email = {
    from: "Vinaarba@gmail.com",
    to: address,
    subject:
      language === "vn"
        ? "🔒VinaArba mã xác nhận🔒"
        : language === "en"
        ? "🔒VinaArba verification code🔒"
        : "🔒비나알바 인증 번호🔒",
    html:
      language === "vn"
        ? `
      <div style="width:638px; height:auto; border: 1px solid #B0B0B0; padding: 48px; border-radius: 20px;">
        <img src="https://vinaarbabucket.s3.ap-southeast-1.amazonaws.com/asset/logo.png"; style="width:200px;" />
        <hr style="color: #B0B0B0; margin: 30px 0px";/>
        <p style="color: #111111";>Đừng cho bất ai biết mã xác nhận. Nhân viên của vina alba tuyệt đối không yêu cầu mã xác nhận.</p>
        <h1 style="color: #111111; margin: 10px 0px";>Mã xác nhận: ${loginSecret}</h1>
        <p style="color: #111111"; font-size: 18px; line-height: 28px;>Không phải là nội dung bạn yêu cầu?<p>
        <p style="color: #111111"; font-size: 18px; line-height: 28px;>Hãy cho VinaArba biết. Chúng tôi sẽ giúp bạn xác nhận và bảo vệ tài khoản.</p>
        <p style="color: #111111; margin-top: 30px;">Cám ơn luôn đồng hành với chúng tôi!</p>
      </div>
        `
        : language === "en"
        ? `
        <div style="width:638px; height:auto; border: 1px solid #B0B0B0; padding: 48px; border-radius: 20px;">
        <img src="https://vinaarbabucket.s3.ap-southeast-1.amazonaws.com/asset/logo.png"; style="width:200px;" />
        <hr style="color: #B0B0B0; margin: 30px 0px";/>
        <p style="color: #111111";>Don't tell anyone the code. VinaArba employees never ask for a security code.</p>
        <h1 style="color: #111111; margin: 10px 0px";>Verification code: ${loginSecret}</h1>
        <p style="color: #111111"; font-size: 18px; line-height: 28px;>Isn't that what you asked for?<p>
        <p style="color: #111111"; font-size: 18px; line-height: 28px;>Please let us know. VinaArba help you protect and verify your account.</p>
        <p style="color: #111111; margin-top: 30px;">Thanks for being here!</p>
      </div>
        `
        : `
        <div style="width:638px; height:auto; border: 1px solid #B0B0B0; padding: 48px; border-radius: 20px;">
          <img src="https://vinaarbabucket.s3.ap-southeast-1.amazonaws.com/asset/logo.png"; style="width:200px;" />
          <hr style="color: #B0B0B0; margin: 30px 0px";/>
          <p style="color: #111111";>아무에게도 코드를 알려주지 마세요. 비나알바 직원이 보안 코드를 요청하는 일은 절대 없습니다.</p>
          <h1 style="color: #111111; margin: 10px 0px";>인증번호: ${loginSecret}</h1>
          <p style="color: #111111"; font-size: 18px; line-height: 28px;>회원님이 요청한 내용이 아닌가요?<p>
          <p style="color: #111111"; font-size: 18px; line-height: 28px;>비나알바에 알려주세요. 회원님의 계정 보호와 확인을 도와드리겠습니다.</p>
          <p style="color: #111111; margin-top: 30px;">함께해주셔서 고맙습니다!</p>
        </div>
        `,
  };
  return sendMail(email);
};

// 추 후 문자 인증으로 변경 시 아래 사용 (네이버SENS)
// export const sendSMS = async (language, countryCode, phoneNumber, secret) => {
//   const date = Date.now().toString();
//   const uri = process.env.SENS_SERVICE_ID;
//   const secretKey = process.env.SENS_SECRET_KEY;
//   const accessKey = process.env.SENS_ACCESS_KEY;
//   const method = "POST";
//   const space = " ";
//   const newLine = "\n";
//   const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
//   const url2 = `/sms/v2/services/${uri}/messages`;

//   const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

//   hmac.update(method);
//   hmac.update(space);
//   hmac.update(url2);
//   hmac.update(newLine);
//   hmac.update(date);
//   hmac.update(newLine);
//   hmac.update(accessKey);

//   const hash = hmac.finalize();
//   const signature = hash.toString(CryptoJS.enc.Base64);

//   const body = {
//     type: "SMS",
//     countryCode: countryCode,
//     from: "01050072571",
//     content: `[Vinaarba] verification: ${secret}`,
//     // language === "vn"
//     //   ? `[Vinaarba] mã xác nhận: ${secret}`
//     //   : language === "en"
//     //   ? `[Vinaarba] authentication number: ${secret}`
//     //   : `[Vinaarba] 인증번호: ${secret}`,
//     messages: [{ to: phoneNumber }],
//   };
//   try {
//     await axios({
//       url: url,
//       method: method,
//       data: body,
//       headers: {
//         "Contenc-type": "application/json; charset=utf-8",
//         "x-ncp-iam-access-key": accessKey,
//         "x-ncp-apigw-timestamp": date,
//         "x-ncp-apigw-signature-v2": signature,
//       },
//     });
//     console.log("success!");
//   } catch (error) {
//     console.log(error);
//   }
// };

export const sendPushMsg = async (
  receiverId,
  sendUserId,
  sendUsername,
  contentId,
  msg,
  postId,
  postType
) => {
  let expo = new Expo();
  const pushTokens = await client.pushToken.findMany({
    where: {
      userId: receiverId,
    },
    select: {
      pushToken: true,
    },
  });
  let somePushTokens = [];
  pushTokens.forEach((e) => {
    somePushTokens.push(e.pushToken);
  });

  let messages = [];
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    if (postType === "userPost") {
      messages.push({
        to: pushToken,
        sound: "default",
        body: `${sendUsername} ${msg}`,
        badge: 0,
        data: { userPostId: postId },
      });
    }
    if (postType === "companyPost") {
      messages.push({
        to: pushToken,
        sound: "default",
        body: `${sendUsername} ${msg}`,
        badge: 0,
        data: { companyPostId: postId },
      });
    }
    if (postType === "following") {
      messages.push({
        to: pushToken,
        sound: "default",
        body: `${sendUsername} ${msg}`,
        badge: 1,
        data: { sendUserId },
      });
    }
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        if (ticketChunk[0].status === "error") {
          console.log(`${ticketChunk[0].message} pushToken:`, chunk[0].to);
          //추후 DB에 저장할 것인가? 아니면 일단 운영자에게 알람 메시지만 보낼 것인가? 정하고 메시지 날리기
        }
        tickets.push(...ticketChunk);
        if (receiverId !== sendUserId) {
          await client.notification.create({
            data: {
              user: {
                connect: {
                  id: sendUserId,
                },
              },
              type: postType,
              contentId,
              postId,
              receiverId,
            },
          });
          await client.user.update({
            where: {
              id: receiverId,
            },
            data: {
              alertStatus: true,
            },
          });
        }
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();
  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
              // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

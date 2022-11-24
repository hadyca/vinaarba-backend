import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadCompanyPost: protectedResolver(
      async (
        _,
        {
          fileUrl,
          title,
          mon,
          tue,
          wed,
          thu,
          fri,
          sat,
          sun,
          dayOption,
          startTime,
          finishTime,
          timeOption,
          wageTypeId,
          wage,
          contactNumber,
          email,
          content,
        },
        { loggedInUser }
      ) => {
        const fileUrl1 = await Promise.all(fileUrl).then();
        try {
          if (fileUrl) {
            const newPost = await client.companyPost.create({
              data: {
                title,
                dayOption,
                startTime,
                finishTime,
                timeOption,
                wageTypeId,
                wage,
                contactNumber,
                email,
                content,
                company: {
                  connect: {
                    userId: loggedInUser.id,
                  },
                },
              },
            });
            await client.workingDay.create({
              data: {
                mon,
                tue,
                wed,
                thu,
                fri,
                sat,
                sun,
                companyPost: {
                  connect: {
                    id: newPost.id,
                  },
                },
              },
            });

            for (let value of fileUrl1) {
              const awsFileUrl = await uploadToS3(
                value,
                loggedInUser.id,
                "companyPost"
              );
              await client.file.create({
                data: {
                  fileUrl: awsFileUrl.Location,
                  fileKey: awsFileUrl.Key,
                  companyPost: {
                    connect: {
                      id: newPost.id,
                    },
                  },
                },
              });
            }
            return newPost;
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

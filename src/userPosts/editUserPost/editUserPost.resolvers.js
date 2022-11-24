import client from "../../client";

import { deleteFile, uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editUserPost: protectedResolver(
      async (
        _,
        { userPostId, fileUrl, content, categoryId },
        { loggedInUser }
      ) => {
        try {
          const oldPost = await client.userPost.findFirst({
            where: {
              id: userPostId,
              userId: loggedInUser.id,
            },
            select: {
              file: true,
            },
          });
          if (!oldPost) {
            return {
              ok: false,
              error: "게시글을 찾을 수 없습니다.",
            };
          }
          if (fileUrl) {
            await client.file.deleteMany({
              where: {
                userPostId,
              },
            });
            oldPost.file.forEach(
              async (value) => await deleteFile(value.fileKey)
            );
            for (let value of fileUrl) {
              const awsFileUrl = await uploadToS3(
                value,
                loggedInUser.id,
                "userPost"
              );
              await client.file.create({
                data: {
                  fileUrl: awsFileUrl.Location,
                  fileKey: awsFileUrl.Key,
                  userPost: {
                    connect: {
                      id: userPostId,
                    },
                  },
                },
              });
            }
            const newPost = await client.userPost.update({
              where: {
                id: userPostId,
              },
              data: {
                content,
                categoryId,
              },
            });
            return {
              ok: true,
              id: newPost.id,
            };
          }
        } catch (error) {
          return error;
        }
      }
    ),
  },
};

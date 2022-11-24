import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const data = await new AWS.S3()
    .upload({
      Bucket: "vinaarba-bucket",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return data;
};

export const deleteFile = async (key) => {
  await new AWS.S3()
    .deleteObject({
      Bucket: "vinaarba-bucket",
      Key: key,
    })
    .promise();
  return;
};

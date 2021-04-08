import aws from "aws-sdk";
const s3 = new aws.S3();
const get = async () => {
  const result = await s3
    .getObject({
      Bucket:
        "arn:aws:s3-object-lambda:ap-southeast-2:186519255627:accesspoint/s2k",
      Key: "data.json",
    })
    .promise();
  console.log(result.Body.toString("utf-8"));
  process.exit(0);
};

get();

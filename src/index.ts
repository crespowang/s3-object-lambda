import { S3 } from "aws-sdk";
import axios from "axios";

const s3 = new S3({ region: "ap-southeast-2" });
export const handler = async (event: any, context: any) => {
  const inputS3Url = event.getObjectContext?.inputS3Url;
  const requestRoute = event.getObjectContext?.outputRoute;
  const outputToken = event.getObjectContext?.outputToken;
  const payload = event.configuration?.payload;
  const object = await axios({
    method: "get",
    url: inputS3Url,
  });
  const modifiedData =
    payload === "public" ? { ...object.data, address: undefined } : object.data;
  try {
    await s3
      .writeGetObjectResponse({
        Body: JSON.stringify(modifiedData),
        RequestRoute: requestRoute,
        RequestToken: outputToken,
      })
      .promise();
    return { status_code: 200 };
  } catch (error) {
    console.log(error);
  }
};

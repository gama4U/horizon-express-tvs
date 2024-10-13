import { readFile } from "fs/promises";
import {
  PutObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import path from 'path'
import s3Client from "../utils/s3-client.utils";

interface MainParams {
  filePath: string;
}

export const uploadFile = async (): Promise<void> => {
  const filePath = path.join(__dirname, '../uploads/' + '1728579366129-383789816.png')
  const fileName = path.basename(filePath);

  const command = new PutObjectCommand({
    Bucket: 'gama4u',
    Key: fileName,
    Body: await readFile(filePath),
    ACL: 'public-read'
  });

  try {
    const response = await s3Client.send(command);
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error("The entity is too large to be uploaded to S3.");
    } else if (caught instanceof S3ServiceException) {
      console.error(`S3 error: ${caught.name}, ${caught.message}`);
    } else {
      throw caught;
    }
  }
};

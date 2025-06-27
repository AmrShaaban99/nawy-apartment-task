import { S3_CONFIG } from '../../config/config';
import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  accessKeyId: S3_CONFIG.accessKeyId,
  secretAccessKey: S3_CONFIG.secretAccessKey,
  region: S3_CONFIG.region,
});
export async function uploadImageToS3(key: string, buffer: Buffer, mimetype: string) {
  const params = {
    Bucket: S3_CONFIG.bucket,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
}

export async function deleteImageFromS3(key: string) {
  const params = {
    Bucket: S3_CONFIG.bucket,
    Key: key,
  };
  return s3.deleteObject(params).promise();
}
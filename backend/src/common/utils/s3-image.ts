import { S3_CONFIG } from '../../config/config';
import AWS from 'aws-sdk';

export class S3ImageManager {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: S3_CONFIG.accessKeyId,
      secretAccessKey: S3_CONFIG.secretAccessKey,
      region: S3_CONFIG.region,
    });
  }

  async uploadImage(key: string, buffer: Buffer, mimetype: string) {
    const params = {
      Bucket: S3_CONFIG.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    };
    return this.s3.upload(params).promise();
  }

  async deleteImage(key: string) {
    const params = {
      Bucket: S3_CONFIG.bucket,
      Key: key,
    };
    return this.s3.deleteObject(params).promise();
  }
}
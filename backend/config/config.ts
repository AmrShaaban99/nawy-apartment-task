import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const S3_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'default-access-key',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'default-secret-key',
  region: process.env.AWS_REGION || 'us-east-1',
  bucket: process.env.AWS_S3_BUCKET || 'default-bucket',
  baseUrl: process.env.AWS_S3_BASE_URL || '', 
  imageFolder: process.env.AWS_S3_IMAGE_FOLDER || 'images', 
};

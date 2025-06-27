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
export const redisConfig = { 
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379, 
  username: process.env.REDIS_USERNAME || '', 
  password: process.env.REDIS_PASSWORD || '', 
  db: Number(process.env.REDIS_DB) || 0, 
};

export const postgresConfig = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'your_db_user',
  password: process.env.POSTGRES_PASSWORD || 'your_db_password',
  database: process.env.POSTGRES_DB || 'your_db_name',
};
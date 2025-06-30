import multer, { FileFilterCallback, MulterError } from 'multer';
import multerS3 from 'multer-s3';
import { S3_CONFIG } from '../../config/config';
import { Response, Request, NextFunction, RequestHandler } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { BadRequestError } from '../errors/http-errors';
import { IUploadField } from "../interfaces/IUploadField";
import path from 'path';

// S3 client instance
export const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_CONFIG.accessKeyId,
    secretAccessKey: S3_CONFIG.secretAccessKey,
  },
  region: S3_CONFIG.region,
});

// Default file size limit (2MB)
const DEFAULT_MAX_SIZE = 2 * 1024 * 1024;

// Helper: Build multer fields config
const buildMulterFields = (fields: IUploadField[]) =>
  fields.map(f => ({
    name: f.name,
    maxCount: f.maxCount || 1,
  }));

// Helper: File filter per field
const createFileFilter = (fields: IUploadField[]) =>
  (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const field = fields.find(f => f.name === file.fieldname);
    const allowedExts = field?.supportedExtensions || ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const ext = path.extname(file.originalname).replace('.', '').toLowerCase();
    if (ext && allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new BadRequestError(`Only [${allowedExts.join(', ')}] files are allowed for ${file.fieldname}`));
    }
  };

// Helper: S3 storage config
const createS3Storage = () =>
  multerS3({
    s3,
    bucket: S3_CONFIG.bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_req, file, cb) => {
      cb(null, `${S3_CONFIG.imageFolder}/${Date.now()}-${file.originalname}`);
    },
  });

// Main middleware factory
export const s3Upload = (
  fields: IUploadField[],
  maxSize: number = DEFAULT_MAX_SIZE
): RequestHandler => {
  const multerFields = buildMulterFields(fields);
  const fileFilter = createFileFilter(fields);

  const upload = multer({
    storage: createS3Storage(),
    fileFilter,
    limits: { fileSize: maxSize },
  });

  return (req: Request, res: Response, next: NextFunction) => {
    upload.fields(multerFields)(req, res, (err: any) => {
      if (err instanceof MulterError) {
        return next(new BadRequestError(`Upload error: ${err.message}`));
      } else if (err) {
        return next(new BadRequestError(err.message || 'File upload failed'));
      }
      next();
    });
  };
};
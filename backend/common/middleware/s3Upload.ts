import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3_CONFIG } from '../../config/config';
import { FileFilterCallback } from 'multer';
import { Response, Request, NextFunction } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { BadRequestError } from '../errors/http-errors'; // Adjust path as needed
import { IUploadField } from '../interfaces/IuploadField'; // Adjust path as needed

export const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_CONFIG.accessKeyId,
    secretAccessKey: S3_CONFIG.secretAccessKey,
  },
  region: S3_CONFIG.region,
});


// Set file size limit (e.g., 2MB)
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export function s3Upload(fields: IUploadField[]) {
  // Build multer fields config
  const multerFields = fields.map(f => ({
    name: f.name,
    maxCount: f.maxCount || 1,
  }));

  // Custom file filter per field
  function fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const field = fields.find(f => f.name === file.fieldname);
    const allowedExts = field?.supportedExtensions || ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const ext = file.originalname.split('.').pop()?.toLowerCase();
    if (ext && allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Only [${allowedExts.join(', ')}] files are allowed for ${file.fieldname}`));
    }
  }

  const upload = multer({
    storage: multerS3({
      s3,
      bucket: S3_CONFIG.bucket,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (_req, file, cb) => {
        cb(null, `${S3_CONFIG.imageFolder}/${Date.now()}-${file.originalname}`);
      },
    }),
    fileFilter,
    limits: { fileSize: MAX_SIZE },
  });

  return (req: Request, res: Response, next: NextFunction) => {
    upload.fields(multerFields)(req, res, function (err: any) {
      if (err) {
        // Wrap multer/S3 errors in your custom error
        return next(new BadRequestError(err.message || 'File upload failed'));
      }
      next();
    });
  };
}
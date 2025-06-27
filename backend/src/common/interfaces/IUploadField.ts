export interface IUploadField {
  name: string;
  maxCount?: number;
  optional?: boolean;
  supportedExtensions?: string[];
  allowNullUrl?: boolean;
  resizeOptions?: { thumbnail?: boolean };
}
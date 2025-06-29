import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     AreaDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
export class AreaDto {
  @Expose()
  @IsOptional()
  @IsString()
  id?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApartmentStatusEnum } from '../enum/apartment-status.enum';

/**
 * @swagger
 * components:
 *   schemas:
 *     ApartmentDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         areaId:
 *           type: string
 *         status:
 *           type: string
 *         isFurnished:
 *           type: boolean
 *         hasParking:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         media:
 *           type: array
 *           items:
 *            type: string
 */
export class ApartmentDto {
  @Expose()
  @IsString()
  @IsOptional()
  id?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  areaId: string;

  @Expose()
  @IsString()
  @IsOptional()
  status?: ApartmentStatusEnum;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isFurnished?: boolean;

  @Expose()
  @IsBoolean()
  @IsOptional()
  hasParking?: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  createdAt?: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  media?: string[];
}


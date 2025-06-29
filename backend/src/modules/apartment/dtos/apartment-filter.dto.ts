import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     ApartmentFilterDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         search:
 *           type: string
 *         areaId:
 *           type: string
 *         status:
 *           type: string
 *         isFurnished:
 *           type: boolean
 *         hasParking:
 *           type: boolean
 *         sortField:
 *           type: string
 *         sortOrder:
 *           type: string
 *           enum: [ASC, DESC]
 */
export class ApartmentFilterDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  areaId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  
  isFurnished?: boolean;

  @IsOptional()
  @IsBoolean()
  hasParking?: boolean;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}

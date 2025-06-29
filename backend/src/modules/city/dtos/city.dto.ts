import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, IsNotEmpty } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     CityDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
export class CityDto {
  
  @Expose()
  @IsOptional()
  @IsString()
  id?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}

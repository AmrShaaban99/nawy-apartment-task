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
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

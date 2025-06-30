import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         flag:
 *           type: string
 *         phoneCode:
 *           type: string
 *         currency:
 *           type: string
 *         region:
 *           type: string
 */
export class CountryDto {

  @Expose()
  @IsOptional()
  id?: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  iso: string;
 
  @Expose()
  @IsString()
  phoneCode: string;
 
  @Expose()
  @IsString()
  currency: string;
 
  @Expose()
  @IsString()
  region: string;
}
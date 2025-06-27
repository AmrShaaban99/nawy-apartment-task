import { IsOptional } from 'class-validator';
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

  @IsOptional()
  id: string;
  name: string;
  iso: string;
  phoneCode: string;
  currency: string;
  region: string;
}
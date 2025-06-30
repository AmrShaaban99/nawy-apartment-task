import { Expose } from "class-transformer";
import { IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     CountryListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         flag:
 *           type: string
 */
export class CountryListItemDto {
  @Expose()
  @IsString()
  id: string;
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  iso: string;
}
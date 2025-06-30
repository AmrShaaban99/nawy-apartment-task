import { IsString, IsNotEmpty } from 'class-validator';
/**
 * @swagger
 * components:
 *   schemas:
 *     GetAreaByCityIdDto:
 *       type: object
 *       properties:
 *         cityId:
 *           type: string
 *           description: The ID of the city to filter areas by
 */
export class GetAreaByCityIdDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;
}

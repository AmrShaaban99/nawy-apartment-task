/**
 * @swagger
 * components:
 *   schemas:
 *     GetCityByCountryIdDto:
 *       type: object
 *       properties:
 *         countryId:
 *           type: string
 *           description: The ID of the country to filter cities by
 */
import { IsString, IsUUID } from 'class-validator';

export class GetCityByCountryIdDto {
    
    @IsString()
    @IsUUID()
    countryId: string;
}

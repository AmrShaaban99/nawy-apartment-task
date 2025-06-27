import { CityService } from './city.service';
import { CityDto } from './dtos/city.dto';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
//import { GetCityByCountryIdDto } from './dtos/getCityByCountryId.dto';
import { GetCityByCountryIdDto } from './dtos/getCitybyCountryId.dto';
import { validate } from 'class-validator';

@injectable()
export class CityController {
  constructor(private cityService: CityService) {}

    /**
     * @swagger
     * /cities:
     *   get:
     *     summary: Get all cities
     *     tags:
     *       - Cities
     *     responses:
     *       200:
     *         description: List of all cities
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CityDto'
     */
  findAll = async (req: Request, res: Response) => {
    const cities = await this.cityService.getAll();
    console.log(cities)
    res.json(cities);
  };

    /**
     * @swagger
     * /cities/country/{countryId}:
     *   get:
     *     summary: Get cities by country ID
     *     tags:
     *       - Cities
     *     parameters:
     *       - in: path
     *         name: countryId
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the country to filter cities by
     *     responses:
     *       200:
     *         description: List of cities in the specified country
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CityDto'
     */
findByCountryId = async (req: Request, res: Response) => {
    // Validate request params using GetCityByCountryIdDto
    const dto = new GetCityByCountryIdDto();
    dto.countryId = req.params.countryId;
    // Validate request params using class-validator
    // Step 1: Validate the DTO
    validate(dto).then(errors => {
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
    });
    const cities = await this.cityService.getByCountryId(dto.countryId);
    res.json(cities);
    

};
}

import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CountryService } from './country.service';
import { CountryDto } from './dtos/country.dto';
import { CountryListItemDto } from './dtos/country-list.dto';

@injectable()
export class CountryController {
  constructor(private countryService: CountryService) {}

/**
 * @swagger
 * /countries/list:
 *   get:
 *     summary: Get a list of countries
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: List of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CountryListItem'
 */
getCountryList = async (req: Request, res: Response) => {
    const countries: CountryListItemDto[] = await this.countryService.getList();
    res.json(countries);
};

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags:
 *       - Countries
 *     responses:
 *       200:
 *         description: All countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
getAllCountries = async (req: Request, res: Response) => {
    const countries: CountryDto[] = await this.countryService.getAll();
    res.json(countries);
};
}
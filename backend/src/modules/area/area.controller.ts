import { AreaService } from './area.service';
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { GetAreaByCityIdDto } from './dtos/getAreaByCityId.dto';
import { validate } from 'class-validator';
import { BadRequestError } from '../../common/errors/http-errors';

@injectable()
export class AreaController {
  constructor(@inject(AreaService) private areaService: AreaService) {}

  /**
   * @swagger
   * /areas:
   *   get:
   *     summary: Get all areas
   *     tags:
   *       - Areas
   *     responses:
   *       200:
   *         description: List of all areas
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/AreaDto'
   */
  findAll = async (req: Request, res: Response) => {
    const areas = await this.areaService.getAll();
    res.json(areas);
  };

  /**
   * @swagger
   * /areas/city/{cityId}:
   *   get:
   *     summary: Get areas by city ID
   *     tags:
   *       - Areas
   *     parameters:
   *       - in: path
   *         name: cityId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the city to filter areas by
   *     responses:
   *       200:
   *         description: List of areas in the specified city
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/AreaDto'
   */
  findByCityId = async (req: Request, res: Response) => {
    const dto = new GetAreaByCityIdDto();
    dto.cityId = req.params.cityId;
    const errors = await validate(dto);
    if (errors.length > 0) {
        throw new BadRequestError(`Invalid city ID ${dto.cityId}`);
    }
    const areas = await this.areaService.getByCityId(dto.cityId);
    res.json(areas);
  };
}

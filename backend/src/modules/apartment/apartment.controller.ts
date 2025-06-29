import { Request, Response, Router } from 'express';
import { injectable, inject } from 'tsyringe';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dtos/create-apartment.dto';
import { ApartmentFilterDto } from './dtos/apartment-filter.dto';
import { validate } from 'class-validator';
import { BadRequestError } from '../../common/errors/http-errors';
import { s3Upload } from '../../common/middleware/s3Upload';
import { IUploadField } from '../../common/interfaces/IUploadField';
import { plainToInstance } from 'class-transformer';

@injectable()
export class ApartmentController {
  constructor(@inject(ApartmentService) private apartmentService: ApartmentService) {}
  static getFilesFields = (): IUploadField[] => [
    {
      name: 'media',
      maxCount: 6,
      optional: true,
      supportedExtensions: ['png', 'jpg', 'jpeg'],
    },
  ];

        /**
     * @swagger
     * /apartments:
     *   post:
     *     summary: Create a new apartment with media
     *     tags:
     *       - Apartments
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/CreateApartmentDto'
     *     responses:
     *       201:
     *         description: Apartment created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ApartmentDto'
     */
  create = async (req: Request, res: Response) => {
    const dto = plainToInstance(CreateApartmentDto, req.body, { excludeExtraneousValues: true });

    const errors = await validate(dto);
    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      throw new BadRequestError('Invalid request data');
    }

    const filesObj = req.files as { [fieldname: string]: (Express.Multer.File & { location?: string })[] };
    if (filesObj?.['media']?.length > 0) {
      dto.media = filesObj?.['media']?.map(f => f.location!).filter(Boolean) || [];
    }

    const apartment = await this.apartmentService.createApartmentWithMedia(dto);
    res.status(201).json(apartment);
  }


  /**
   * @swagger
   * /apartments/filter:
   *   get:
   *     summary: Filter apartments (lightweight list)
   *     tags:
   *       - Apartments
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Items per page
   *       - in: query
   *         name: sortField
   *         schema:
   *           type: string
   *         description: Field to sort by
   *       - in: query
   *         name: sortOrder
   *         schema:
   *           type: string
   *           enum: [ASC, DESC]
   *         description: Sort order
   *       - in: query
   *         name: areaId
   *         schema:
   *           type: string
   *         description: Area ID
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *         description: Apartment status
   *       - in: query
   *         name: isFurnished
   *         schema:
   *           type: boolean
   *         description: Is furnished
   *       - in: query
   *         name: hasParking
   *         schema:
   *           type: boolean
   *         description: Has parking
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search by title
   *     responses:
   *       200:
   *         description: Filtered apartment list
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 items:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/ApartmentListDto'
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 limit:
   *                   type: integer
   */
  findAll = async (req: Request, res: Response) => {
    const dto = new ApartmentFilterDto();
    Object.assign(dto, req.query);
    const filter = plainToInstance(ApartmentFilterDto, dto, {
          excludeExtraneousValues: true
      });
    const errors = await validate(filter);
    if (errors.length > 0) {
      throw new BadRequestError('Invalid query parameters');
    }
    const result = await this.apartmentService.getAllApartments(dto);
    res.json(result);
  };

  /**
   * @swagger
   * /apartments/{id}:
   *   get:
   *     summary: Get apartment by ID
   *     tags:
   *       - Apartments
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Apartment ID
   *     responses:
   *       200:
   *         description: Apartment details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApartmentDetailsDto'
   */
  findById = async (req: Request, res: Response) => {
    if (!req.params.id) {
      throw new BadRequestError('Apartment ID is required');
    }
    const apartment = await this.apartmentService.getApartmentById(req.params.id);
    res.json(apartment);
  };
}

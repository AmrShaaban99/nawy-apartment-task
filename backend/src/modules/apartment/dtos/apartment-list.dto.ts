import { Expose } from 'class-transformer';
import { ApartmentStatusEnum } from '../enum/apartment-status.enum';

/**
 * @swagger
 * components:
 *   schemas:
 *     ApartmentListDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         numberOfRooms:
 *           type: number
 *         numberOfBathrooms:
 *           type: number
 *         status:
 *           type: string
 *           enum: [available, sold, rented]
 *         media:
 *           type: string
 *           nullable: true
 */
export class ApartmentListDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  price: number;

  @Expose()
  numberOfRooms: number;

  @Expose()
  numberOfBathrooms: number;

  @Expose()
  status: ApartmentStatusEnum;

  @Expose()
  media: string | null;
}



import { Expose, Type } from 'class-transformer';
import { ApartmentStatusEnum } from '../enum/apartment-status.enum';

/**
 * @swagger
 * components:
 *   schemas:
 *     ApartmentDetailsDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         sizeInSquareMeters:
 *           type: number
 *         numberOfRooms:
 *           type: number
 *         numberOfBathrooms:
 *           type: number
 *         isFurnished:
 *           type: boolean
 *         hasBalcony:
 *           type: boolean
 *         hasElevator:
 *           type: boolean
 *         hasParking:
 *           type: boolean
 *         hasSecurity:
 *           type: boolean
 *         floorNumber:
 *           type: number
 *         totalFloorsInBuilding:
 *           type: number
 *         longitude:
 *           type: number
 *         latitude:
 *           type: number
 *         streetName:
 *           type: string
 *         streetNumber:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, sold, rented]
 *         isActive:
 *           type: boolean
 *         areaId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         media:
 *           type: array
 *           items:
 *             type: string
 *         area:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 */
export class ApartmentDetailsDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  sizeInSquareMeters: number;

  @Expose()
  numberOfRooms: number;

  @Expose()
  numberOfBathrooms: number;

  @Expose()
  isFurnished: boolean;

  @Expose()
  hasBalcony: boolean;

  @Expose()
  hasElevator: boolean;

  @Expose()
  hasParking: boolean;

  @Expose()
  hasSecurity: boolean;

  @Expose()
  floorNumber: number;

  @Expose()
  totalFloorsInBuilding: number;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  @Expose()
  streetName: string;

  @Expose()
  streetNumber: string;

  @Expose()
  status: ApartmentStatusEnum;

  @Expose()
  isActive: boolean;

  @Expose()
  areaId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  media: string[];
  @Expose()

  area :string;

  @Expose()
  city: string;

  @Expose()
  country: string;
}


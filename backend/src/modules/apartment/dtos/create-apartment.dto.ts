import { Expose, Transform} from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApartmentStatusEnum } from "../enum/apartment-status.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateApartmentDto:
 *       type: object
 *       required:
 *         - title
 *         - areaId
 *       properties:
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
 *         hasBalcony:
 *           type: boolean
 *         hasElevator:
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
 *           enum:
 *             - available
 *             - sold
 *             - rented
 *         isActive:
 *           type: boolean
 *         areaId:
 *           type: string
 *         isFurnished:
 *           type: boolean
 *         hasParking:
 *           type: boolean
 *         media:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 */
export class CreateApartmentDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;
  

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'number' ? value : parseFloat(value))
  price: number;


  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'number' ? value : parseFloat(value))
  sizeInSquareMeters: number;


  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'number' ? value : parseFloat(value))
  numberOfRooms: number;


  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => typeof value === 'number' ? value : parseFloat(value))
  numberOfBathrooms: number;


  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  hasBalcony?: boolean;


  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  hasElevator?: boolean;


  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  hasSecurity?: boolean;


  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : (typeof value === 'number' ? value : parseFloat(value)))
  floorNumber?: number;


  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : (typeof value === 'number' ? value : parseFloat(value)))
  totalFloorsInBuilding?: number;


  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : (typeof value === 'number' ? value : parseFloat(value)))
  longitude?: number;


  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : (typeof value === 'number' ? value : parseFloat(value)))
  latitude?: number;

  @Expose()
  @IsString()
  @IsOptional()
  streetName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  streetNumber?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsEnum(ApartmentStatusEnum)
  status: ApartmentStatusEnum = ApartmentStatusEnum.AVAILABLE;


  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  isActive?: boolean;

  @Expose()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  areaId: string;


  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  isFurnished?: boolean;


  @Expose()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
  })
  hasParking?: boolean;

  @Expose()
  @IsArray()
  @IsOptional()
  media?: string[]; 
}
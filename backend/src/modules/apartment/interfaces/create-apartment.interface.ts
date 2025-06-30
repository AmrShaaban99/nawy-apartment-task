import { ApartmentStatusEnum } from "../enum/apartment-status.enum";

export interface CreateApartmentData {
  title: string;
  description: string;
  price: number;
  sizeInSquareMeters: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  isFurnished?: boolean;
  hasBalcony?: boolean;
  hasElevator?: boolean;
  hasParking?: boolean;
  hasSecurity?: boolean;
  floorNumber?: number;
  totalFloorsInBuilding?: number;
  longitude?: number;
  latitude?: number;
  streetName?: string;
  areaId: string; 
  status?: ApartmentStatusEnum; 
  streetNumber?: string;
  isActive?: boolean; 
  media?:string[];
}

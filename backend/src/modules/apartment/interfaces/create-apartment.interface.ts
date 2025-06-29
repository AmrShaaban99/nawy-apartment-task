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
  areaId: string; // Assuming areaId is a UUID
  status?: ApartmentStatusEnum; // Default to AVAILABLE if not provided
  streetNumber?: string;
  isActive?: boolean; // Default to true if not provided
  media?:string[];
}

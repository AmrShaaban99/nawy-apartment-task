export interface ApartmentMedia {
  url: string;
}

export interface ApartmentState {
  filters: ApartmentFilters;
  sortBy: 'title' | 'createdAt' | 'price' | 'sizeInSquareMeters' | 'numberOfRooms';
  sortOrder: 'asc' | 'desc';
}

export interface Apartment {
  id?: string;
  title: string;
  description?: string;
  areaId: string;
  status?: string;
  isFurnished?: boolean;
  hasParking?: boolean;
  price: number;
  sizeInSquareMeters: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  createdAt?: string;
  media?: string[];
}

export interface ApartmentFilters {
  search: string;
  areaId?: string;
  status?: string;
  isFurnished?: boolean | null;
  hasParking?: boolean | null;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  minBathrooms?: number;
  minSize?: number;
  maxSize?: number;
}

export interface ApartmentSearchParams {
  page: number;
  limit: number;
  sortBy: 'title' | 'createdAt' | 'price' | 'sizeInSquareMeters' | 'numberOfRooms';
  sortOrder: 'asc' | 'desc';
  filters: Partial<ApartmentFilters>;
}

export interface ApartmentId {
  id: string;
}

export interface ApartmentSearchResponse {
  items: Apartment[];
  total: number;
  page: number;
  limit: number;
}

export interface ApartmentDetailsResponse {
  id: string;
  title: string;
  description: string;
  price: number;
  sizeInSquareMeters: number;
  numberOfRooms: number;
  numberOfBathrooms: number;
  isFurnished: boolean;
  hasBalcony: boolean;
  hasElevator: boolean;
  hasParking: boolean;
  hasSecurity: boolean;
  floorNumber: number;
  totalFloorsInBuilding: number;
  longitude: number;
  latitude: number;
  streetName: string;
  streetNumber: string;
  status: string;
  isActive: boolean;
  areaId: string;
  createdAt: string;
  media: string[];
  area: string;
  city: string;
  country: string;
}
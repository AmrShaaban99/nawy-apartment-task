export interface ApartmentMedia {
  id?: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
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

export interface ApartmentSearchResponse {
  items: Apartment[];
  total: number;
  page: number;
  limit: number;
}
import { Apartment } from "../entities/apartment.entity";

export interface ApartmentSearchResult {
  items: Apartment[];
  total: number;
  page: number;
  limit: number;
}
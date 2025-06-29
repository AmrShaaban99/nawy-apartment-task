import { ApartmentListDto } from "./apartment-list.dto";

export interface ApartmentPagedDto {
  items: ApartmentListDto[];
  total: number;
  page: number;
  limit: number;
}
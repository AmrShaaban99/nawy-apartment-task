export interface ApartmentListQuery {
    page?: number;
    limit?: number;
    search?: string;
    areaId?: string;
    status?: string; 
    isFurnished?: boolean;
    hasParking?: boolean;
    sortField?: string ;
    sortOrder?: string ;
}
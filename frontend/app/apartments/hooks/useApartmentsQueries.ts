import { useApiQuery } from "@/services/apiClient"
import { ApartmentDetailsResponse, ApartmentId, ApartmentSearchParams, ApartmentSearchResponse } from "../types/apartment";

export const useGetApartments = (args: ApartmentSearchParams) => {
    return useApiQuery<ApartmentSearchResponse>(
        ['/apartments/', args],
        '/apartments/',
        {
            params: {
                page: args.page,
                limit: args.limit,
                sortBy: args.sortBy,
                sortOrder: args.sortOrder,
                search: args.filters.search,
            },
        },
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        }
    );
}
export const useGetApartmentById = (args: ApartmentId) => {
    return useApiQuery<ApartmentDetailsResponse>(
        ['/apartments/', args.id],
        `/apartments/${args.id}`,
        {},
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
        }
    );
}

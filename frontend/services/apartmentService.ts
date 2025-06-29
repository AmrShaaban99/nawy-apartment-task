import { Apartment, ApartmentSearchParams, ApartmentSearchResponse } from '@/types/apartment';
import axios from 'axios';

class ApartmentService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  private baseDelay = 800; // Simulate API delay

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async searchApartments(params: ApartmentSearchParams): Promise<ApartmentSearchResponse> {
    // Map frontend params to backend query params
    const query: Record<string, any> = {
      page: params.page,
      limit: params.limit,
      sortField: params.sortBy,
      sortOrder: params.sortOrder?.toUpperCase(),
      ...params.filters,
    };
    // Remove undefined/null
    Object.keys(query).forEach(key => (query[key] == null) && delete query[key]);

    try {
      const res = await axios.get(`${this.baseUrl}/apartments/filter`, { params: query });
      return {
        items: res.data.items,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit
      };
    } catch (error: any) {
      // Friendly error for client
      throw new Error(
        error?.response?.status === 500
          ? 'Sorry, something went wrong on the server. Please try again later.'
          : error?.response?.data?.message || 'Failed to fetch apartments.'
      );
    }
  }

  async getApartmentById(id: string): Promise<Apartment | null> {
    try {
      const res = await axios.get(`${this.baseUrl}/apartments/${id}`);
      return res.data || null;
    } catch (error: any) {
      throw new Error(
        error?.response?.status === 500
          ? 'Sorry, something went wrong on the server. Please try again later.'
          : error?.response?.data?.message || 'Failed to fetch apartment details.'
      );
    }
  }

  async getRelatedApartments(apartmentId: string, limit: number = 3): Promise<Apartment[]> {
    try {
      // Fetch the current apartment to get areaId/price
      const current = await this.getApartmentById(apartmentId);
      if (!current) return [];
      // Use filter endpoint to get related apartments (same area or similar price)
      const query: Record<string, any> = {
        //areaId: current.areaId,
        // minPrice: current.price - 1000,
        // minPrice: current.price - 1000,
        // maxPrice: current.price + 1000,
        limit: limit + 1, // +1 to exclude self
      };
      const res = await axios.get(`${this.baseUrl}/apartments/filter`, { params: query });
      // Exclude the current apartment from results
      const related = (res.data.items as Apartment[]).filter(apt => apt.id !== apartmentId).slice(0, limit);
      return related;
    } catch (error: any) {
      throw new Error(
        error?.response?.status === 500
          ? 'Sorry, something went wrong on the server. Please try again later.'
          : error?.response?.data?.message || 'Failed to fetch related apartments.'
      );
    }
  }
}

export const apartmentService = new ApartmentService();
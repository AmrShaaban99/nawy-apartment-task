'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { FilterPanel } from '@/components/molecules/FilterPanel';
import { ApartmentGrid } from '@/components/organisms/ApartmentGrid';
import { PaginationControls } from '@/components/organisms/PaginationControls';
import { useApartmentContext } from '@/contexts/ApartmentContext';
import { apartmentService } from '@/services/apartmentService';
import { ApartmentSearchResponse } from '@/types/apartment';
import { useMutation } from '@tanstack/react-query';

export default function ApartmentsPage() {
  const { state } = useApartmentContext();
  const [data, setData] = useState<ApartmentSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const searchParams = {
        page: state.currentPage,
        limit: 2,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        filters: state.filters,
      };
      return await apartmentService.searchApartments(searchParams);
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (response) => {
      setData(response);
      setLoading(false);
    },
    onError: (err: any) => {
      setError(err instanceof Error ? err.message : 'Failed to load apartments');
      setLoading(false);
    }
  });

  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters, state.sortBy, state.sortOrder, state.currentPage]);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-rose-50 to-amber-50">
      {/* Hero Section with Modern Design */}
      <div className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-20 w-60 h-60 bg-gradient-to-br from-stone-200/40 to-rose-200/40 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-stone-200/30 rounded-full blur-xl"></div>
        </div>

        <div className="relative bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
                  MODERN
                  <span className="block font-bold bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent">
                    LIVING
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed">
                  Beautiful designs for your home
                </p>
              </div>
              
              <div className="relative">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Filters and Results Count */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="w-full lg:w-auto">
              <FilterPanel />
            </div>
            {data && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 border border-stone-200/50 shadow-sm">
                <div className="text-stone-700 font-medium">
                  {data.total} apartment{data.total !== 1 ? 's' : ''} found
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="relative">
            <ApartmentGrid
              apartments={data?.items || []}
              loading={loading}
              error={error}
            />
          </div>

          {/* Pagination at the End */}
          {data && totalPages > 1 && !loading && (
            <div className="mt-16">
              <PaginationControls
                total={data.total}
                page={data.page}
                limit={data.limit}
              />
            </div>
          )}

          {/* End of Results Message */}
          {data && data.total > 0 && !loading && (
            <div className="text-center py-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-stone-200/50 shadow-sm">
                <div className="text-stone-600">
                  <p className="text-lg font-medium mb-2 text-stone-800">End of Results</p>
                  <p className="text-sm leading-relaxed">
                    You've viewed all {data.total} apartment{data.total !== 1 ? 's' : ''} matching your criteria.
                  </p>
                  {data.page > 1 && (
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="mt-4 text-stone-700 hover:text-stone-900 text-sm font-medium underline underline-offset-4 decoration-stone-300 hover:decoration-stone-500 transition-colors"
                    >
                      Back to top
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
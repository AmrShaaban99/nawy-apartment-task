import { FilterPanel } from '@/components/molecules/FilterPanel'
import React, { useState } from 'react'
import { useGetApartments } from '../hooks/useApartmentsQueries'
import { ApartmentGrid } from '@/components/organisms/ApartmentGrid'
import { PaginationControls } from '@/components/organisms/PaginationControls'
import { ApartmentFilters, ApartmentState } from '../types/apartment'

const ApartmentsSection = () => {
    
 
    const [apartmentFilters,setApartmentFilters]= useState<ApartmentState>({filters:{} as ApartmentFilters, sortBy: 'createdAt', sortOrder: 'desc'});
    // State for pagination 
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);

    // Fetch apartments data using custom hook
    const {isLoading,isError,isSuccess,data} = useGetApartments({page, limit, sortBy: apartmentFilters.sortBy, sortOrder: apartmentFilters.sortOrder, filters: apartmentFilters.filters});
   
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Filters and Results Count */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="w-full lg:w-auto">
              <FilterPanel filters={apartmentFilters} onSearchClick={(filters)=>{setApartmentFilters(filters)}}/>
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
              loading={isLoading}
              error={isError? 'Failed to load apartments' : null}
            />
          </div>
          {data && data.total > 1 && isSuccess && (
            <div className="mt-16">
              <PaginationControls
                onPageChange={(newPage) => setPage(newPage)}
                total={data.total}
                page={data.page}
                limit={data.limit}
              />
            </div>
          )}
        </div>
      </div>
  )
}

export default ApartmentsSection
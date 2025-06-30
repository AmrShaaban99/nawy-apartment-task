'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApartmentState } from '@/app/apartments/types/apartment';
import { useState } from 'react';

interface Props {
  readonly filters: ApartmentState;
  readonly onSearchClick: (filters: ApartmentState) => void;
}

export function FilterPanel({filters,onSearchClick}: Props) {

  const [apartmentFilters,setApartmentFilters]= useState<ApartmentState>({filters:filters.filters, sortBy: filters.sortBy, sortOrder: filters.sortOrder});
  return (
    <div className="w-full p-6 bg-white rounded shadow flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex-1 min-w-0 grid grid-cols-6 gap-4 w-full">
          <Input
            placeholder="Search..."
            value={apartmentFilters.filters.search}
            onChange={e => setApartmentFilters({ 
              ...apartmentFilters, 
              filters: { 
          ...apartmentFilters.filters, 
          search: e.target.value || '' 
              } 
            })}
            className="col-span-4 focus:outline-none"
          />
          <Button 
            onClick={()=>{onSearchClick(apartmentFilters)}} 
            className="col-span-2 bg-stone-700 text-white rounded h-10 font-medium"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
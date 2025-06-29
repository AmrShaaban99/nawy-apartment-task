'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApartmentContext } from '@/contexts/ApartmentContext';


export function FilterPanel() {
  const { state, dispatch } = useApartmentContext();
  const [localFilters, setLocalFilters] = useState(state.filters);

  const handleApplyFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: localFilters });
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: '',
      areaId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    };
    setLocalFilters(resetFilters);
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search..."
          value={localFilters.search}
          onChange={e => setLocalFilters({ ...localFilters, search: e.target.value })}
        />
        {/* Area select removed: replace with static or API-driven options as needed */}
        <Input
          type="number"
          placeholder="Min Price"
          value={localFilters.minPrice || ''}
          onChange={e => setLocalFilters({ ...localFilters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={localFilters.maxPrice || ''}
          onChange={e => setLocalFilters({ ...localFilters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleApplyFilters} className="bg-stone-700 text-white rounded h-10 font-medium">Apply</Button>
        <Button onClick={handleResetFilters} variant="outline" className="border-stone-300 text-stone-700 rounded h-10 font-medium">Reset</Button>
      </div>
    </div>
  );
}
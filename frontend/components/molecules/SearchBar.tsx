'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApartmentContext } from '@/contexts/ApartmentContext';

export function SearchBar() {
  const { state, dispatch } = useApartmentContext();
  const [localSearch, setLocalSearch] = useState(state.filters.search);

  const handleSearch = () => {
    dispatch({ type: 'SET_FILTERS', payload: { search: localSearch } });
  };

  const handleClear = () => {
    setLocalSearch('');
    dispatch({ type: 'SET_FILTERS', payload: { search: '' } });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search by location, neighborhood, or apartment name..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-14 pr-14 h-16 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-stone-300/50 placeholder:text-stone-400"
        />
        {localSearch && (
          <button
            onClick={handleClear}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-full hover:bg-stone-100"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <Button 
        onClick={handleSearch}
        className="ml-4 h-16 px-8 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
      >
        Search
      </Button>
    </div>
  );
}
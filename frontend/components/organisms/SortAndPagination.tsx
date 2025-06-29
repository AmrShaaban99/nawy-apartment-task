'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartmentContext } from '@/contexts/ApartmentContext';

interface SortAndPaginationProps {
  total: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export function SortAndPagination({
  total,
  totalPages,
  currentPage,
  itemsPerPage,
}: SortAndPaginationProps) {
  const { state, dispatch } = useApartmentContext();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-') as ['title' | 'createdAt' | 'price' | 'sizeInSquareMeters' | 'numberOfRooms', 'asc' | 'desc'];
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: page });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages} ({total} apartments)
      </div>
      <div className="flex items-center gap-4">
        <select
          value={`${state.sortBy}-${state.sortOrder}`}
          onChange={handleSort}
          className="rounded border p-2"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="sizeInSquareMeters-asc">Size: Small to Large</option>
          <option value="sizeInSquareMeters-desc">Size: Large to Small</option>
          <option value="numberOfRooms-asc">Rooms: Low to High</option>
          <option value="numberOfRooms-desc">Rooms: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
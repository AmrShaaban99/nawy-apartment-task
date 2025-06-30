'use client';

import { ApartmentCard } from '@/components/molecules/ApartmentCard';
import { Apartment } from '@/app/apartments/types/apartment';

interface ApartmentGridProps {
  apartments: Apartment[];
  loading?: boolean;
  error?: string | null;
}

export function ApartmentGrid({ apartments, loading, error }: ApartmentGridProps) {
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mr-4"></div>
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  if (error) return <div className="text-red-600">{error}</div>;
  if (!apartments.length)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <svg
          className="w-12 h-12 mb-3 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V9h6v12"
          />
        </svg>
        <span className="text-lg font-medium">No apartments found.</span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
}
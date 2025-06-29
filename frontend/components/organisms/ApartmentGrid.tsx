'use client';

import { ApartmentCard } from '@/components/molecules/ApartmentCard';
import { Apartment } from '@/types/apartment';

interface ApartmentGridProps {
  apartments: Apartment[];
  loading?: boolean;
  error?: string | null;
}

export function ApartmentGrid({ apartments, loading, error }: ApartmentGridProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!apartments.length) return <div>No apartments found.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
}
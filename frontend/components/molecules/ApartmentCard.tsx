'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/types/apartment';

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const primaryImage =
    Array.isArray(apartment.media) ? apartment.media[0] : apartment.media;

  return (
    <Link href={`/apartments/${apartment.id}`}>
      <div className="border rounded shadow p-4 bg-white flex flex-col gap-2 hover:shadow-lg transition">
        <div className="relative w-full aspect-[4/3] mb-2">
          <Image
            src={
              primaryImage ||
              'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
            }
            alt={apartment.title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div className="font-bold text-lg">{apartment.title}</div>
        <div className="text-sm text-gray-600">
          Area: {apartment.areaId}
        </div>
        <div className="text-sm text-gray-600">
          Price: {apartment.price}
        </div>
        <div className="text-xs text-gray-400">
          Rooms: {apartment.numberOfRooms} | Baths:{' '}
          {apartment.numberOfBathrooms} | Size: {apartment.sizeInSquareMeters}m²
        </div>
      </div>
    </Link>
  );
}
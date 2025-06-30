'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/app/apartments/types/apartment';

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
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span className="font-semibold">Price:</span>
          <span className="text-green-700 font-bold">{apartment.price}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
          <span>
            <span className="font-medium">Rooms:</span> {apartment.numberOfRooms}
          </span>
          <span>
            <span className="font-medium">Baths:</span> {apartment.numberOfBathrooms}
          </span>
        </div>
      </div>
    </Link>
  );
}
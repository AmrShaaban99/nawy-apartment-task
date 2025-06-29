"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Phone, Mail, User, X, BedDouble, Bath, Square, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageGallery } from '@/components/molecules/ImageGallery';
import { ApartmentGrid } from '@/components/organisms/ApartmentGrid';
import { ApartmentDetailsSkeleton } from '@/components/ui/loading-skeleton';
import { apartmentService } from '@/services/apartmentService';
import { Apartment } from '@/types/apartment';

export default function ApartmentDetailsClient({ apartmentId }: { apartmentId: string }) {
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [relatedApartments, setRelatedApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const [apartmentData, relatedData] = await Promise.all([
          apartmentService.getApartmentById(apartmentId),
          apartmentService.getRelatedApartments(apartmentId, 3)
        ]);
        if (!apartmentData) {
          setError('Apartment not found');
          return;
        }
        setApartment(apartmentData);
        setRelatedApartments(relatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load apartment details');
      } finally {
        setLoading(false);
      }
    };
    if (apartmentId) fetchApartmentDetails();
  }, [apartmentId]);

  const formatAreaId = (areaId: string) => areaId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rented': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"><ApartmentDetailsSkeleton /></div></div>;
  if (error || !apartment) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800 mb-2">Apartment Not Found</h1>
          <p className="text-red-600 mb-6">{error || 'The apartment you are looking for does not exist.'}</p>
          <Link href="/apartments">
            <Button className="bg-blue-600 hover:bg-blue-700"><ArrowLeft className="h-4 w-4 mr-2" />Back to Listings</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />Back to listings
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <ImageGallery media={(apartment.media || []).map((item: any) => typeof item === 'string' ? { url: item } : item)} title={apartment.title} />
          </div>
          <div className="md:col-span-4">
            <Card className="mt-6 md:mt-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{apartment.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-4"><MapPin className="h-5 w-5 mr-2" /><span>{formatAreaId(apartment.areaId)}</span></div>
                  </div>
                  <Badge className={getStatusColor(apartment.status)}>{apartment.status || 'Unknown'}</Badge>
                </div>
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center"><BedDouble className="h-5 w-5 mr-2 text-gray-500" /><span>{apartment.numberOfRooms} room{apartment.numberOfRooms !== 1 ? 's' : ''}</span></div>
                  <div className="flex items-center"><Bath className="h-5 w-5 mr-2 text-gray-500" /><span>{apartment.numberOfBathrooms} bath</span></div>
                  <div className="flex items-center"><Square className="h-5 w-5 mr-2 text-gray-500" /><span>{apartment.sizeInSquareMeters}m²</span></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {apartment.description && (<><div><h3 className="text-lg font-semibold mb-3">Description</h3><p className="text-gray-700 leading-relaxed">{apartment.description}</p></div><Separator /></>)}
                <div><h3 className="text-lg font-semibold mb-3">Property Features</h3><div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Furnished</span><Badge variant={apartment.isFurnished ? 'default' : 'secondary'}>{apartment.isFurnished ? 'Yes' : 'No'}</Badge></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Parking</span><Badge variant={apartment.hasParking ? 'default' : 'secondary'}>{apartment.hasParking ? 'Available' : 'Not Available'}</Badge></div>
                </div></div>
              </CardContent>
            </Card>
          </div>
        </div>
        {relatedApartments.length > 0 && (<div className="mt-12"><h2 className="text-2xl font-bold mb-6">Similar Apartments in {formatAreaId(apartment.areaId)}</h2><ApartmentGrid apartments={relatedApartments} /></div>)}
      </div>
    </div>
  );
}

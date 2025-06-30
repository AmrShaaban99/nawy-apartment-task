"use client";
import Link from 'next/link';
import { ArrowLeft, MapPin, X, BedDouble, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageGallery } from '@/components/molecules/ImageGallery';
import { ApartmentGrid } from '@/components/organisms/ApartmentGrid';
import { ApartmentDetailsSkeleton } from '@/components/ui/loading-skeleton';
import ApartmentGoBack from '../components/ApartmentGoBack';
import { useGetApartmentById, useGetApartments } from '../hooks/useApartmentsQueries';

export default function ApartmentDetailsPage({ params }: { readonly params: { readonly id: string } }) {
  const apartmentId = params.id;
  
  const { isLoading: isApartmentLoading, isError: isApartmentError, data: apartmentData } = useGetApartmentById({ id: apartmentId });
  const { isLoading: isRelatedLoading, data: relatedApartments } = useGetApartments({ page: 1, limit: 3, sortBy: "createdAt", sortOrder: "desc", filters: { areaId: apartmentData?.areaId } });

  const formatAreaId = (areaId: string) => areaId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rented': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isApartmentLoading) return <div className="min-h-screen bg-gray-50"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"><ApartmentDetailsSkeleton /></div></div>;
  if (isApartmentError || !apartmentData) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800 mb-2">Apartment Not Found</h1>
          <p className="text-red-600 mb-6">{isApartmentError || 'The apartment you are looking for does not exist.'}</p>
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
        <ApartmentGoBack/>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <ImageGallery media={(apartmentData.media || [])} title={apartmentData.title} />
          </div>
          <div className="md:col-span-4">
            <Card className="mt-6 md:mt-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{apartmentData.title}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-4"><MapPin className="h-5 w-5 mr-2" /><span>{apartmentData.area}</span></div>
                  </div>
                  <Badge className={getStatusColor(apartmentData.status)}>{apartmentData.status || 'Unknown'}</Badge>
                </div>
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center"><BedDouble className="h-5 w-5 mr-2 text-gray-500" /><span>{apartmentData.numberOfRooms} room{apartmentData.numberOfRooms !== 1 ? 's' : ''}</span></div>
                  <div className="flex items-center"><Bath className="h-5 w-5 mr-2 text-gray-500" /><span>{apartmentData.numberOfBathrooms} bath</span></div>
                  <div className="flex items-center"><Square className="h-5 w-5 mr-2 text-gray-500" /><span>{apartmentData.sizeInSquareMeters}m²</span></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {apartmentData.description && (<><div><h3 className="text-lg font-semibold mb-3">Description</h3><p className="text-gray-700 leading-relaxed">{apartmentData.description}</p></div><Separator /></>)}
                <div><h3 className="text-lg font-semibold mb-3">Property Features</h3><div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Furnished</span><Badge variant={apartmentData.isFurnished ? 'default' : 'secondary'}>{apartmentData.isFurnished ? 'Yes' : 'No'}</Badge></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Parking</span><Badge variant={apartmentData.hasParking ? 'default' : 'secondary'}>{apartmentData.hasParking ? 'Available' : 'Not Available'}</Badge></div>
                </div></div>
              </CardContent>
            </Card>
          </div>
        </div>
        {relatedApartments && relatedApartments.total > 0 && (<div className="mt-12"><h2 className="text-2xl font-bold mb-6">Similar Apartments in {formatAreaId(apartmentData.area)}</h2><ApartmentGrid apartments={ relatedApartments.items} /></div>)}
      </div>
    </div>
  );
}


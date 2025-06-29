import ApartmentDetailsClient from './ApartmentDetailsClient';
import { apartmentService } from '@/services/apartmentService';

export async function generateStaticParams() {
  try {
    const res = await apartmentService.searchApartments({
      page: 1,
      limit: 100,
      filters: {},
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    return res.items.map((apt: any) => ({ id: apt.id }));
  } catch (err) {
    console.error('Failed to fetch apartments for static params:', err);
    return [];
  }
}


export default function ApartmentDetailsPage({ params }: { params: { id: string } }) {
  return <ApartmentDetailsClient apartmentId={params.id} />;
}
import { inject, injectable } from 'tsyringe';
import { ApartmentRepository } from './apartment.repository';
import { ApartmentListDto } from './dtos/apartment-list.dto';
import { plainToInstance } from 'class-transformer';
import { CreateApartmentData } from './interfaces/create-apartment.interface';
import { ApartmentListQuery } from './interfaces/apartment-list-query.interface';
import { ApartmentPagedDto } from './dtos/apartment-paged.dto';
import { ApartmentFilterDto } from './dtos/apartment-filter.dto';
import { ApartmentDetailsDto } from './dtos/apartment-details.dto';

@injectable()
export class ApartmentService {
    constructor(
        @inject(ApartmentRepository) private apartmentRepository: ApartmentRepository
    ) {}
    async createApartmentWithMedia(data: CreateApartmentData) {
        return this.apartmentRepository.createApartmentWithMedia(data);
    }
    async getAllApartments(query: ApartmentFilterDto): Promise<ApartmentPagedDto> {
        const result = await this.apartmentRepository.searchAndFilter(query);
        const items = result.items.map((apartment: any) => {
            let media: string | null = null;
            if (Array.isArray(apartment.media)) {
                media = apartment.media[0]?.url ?? null;
            } else if (typeof apartment.media === 'object' && apartment.media?.url) {
                media = apartment.media.url;
            } else {
                media = null;
            }
            return plainToInstance(ApartmentListDto, { ...apartment, media }, {
                excludeExtraneousValues: true});
        });
        return { ...result, items };
    }
    
    async getApartmentById(id: string): Promise<ApartmentDetailsDto> {
        const apartment = await this.apartmentRepository.getById(id);
        if (!apartment) {
            throw new Error('Apartment not found');
        }
        const media = Array.isArray(apartment.media)
            ? apartment.media.map(m => m.url)
            : [];
        // Map area, city, country names if available
        const area = apartment.area ? apartment.area.name : '';
        const city = apartment.area?.city?.name ?? '';
        const country = apartment.area?.city?.country?.name ?? '';
        return plainToInstance(ApartmentDetailsDto, {
            ...apartment,
            media,
            area,
            city,
            country
        }, { excludeExtraneousValues: true });
    }
}
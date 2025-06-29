
import { inject, injectable } from 'tsyringe';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { CreateApartmentData } from './interfaces/create-apartment.interface';
import { ApartmentSearchResult } from './interfaces/apartment-search-result.interface';
import { ApartmentMedia } from './entities/apartment-media.entity';
import { BadRequestError } from '../../common/errors/http-errors';
import { ApartmentListQuery } from './interfaces/apartment-list-query.interface';
@injectable()
export class ApartmentRepository {
    constructor(@inject('DataSource') private dataSource: DataSource) {}

    private get repo(): Repository<Apartment> {
        return this.dataSource.getRepository(Apartment);
    }

    async getAll(): Promise<Apartment[]> {
        return this.repo.find({ where: { isActive: true } });
    }

    async getById(id: string): Promise<Apartment | null> {
        return this.repo.findOne({
            where: { id, isActive: true },
            relations: [
                'media',
                'area',
                'area.city',
                'area.city.country'
            ]
        });
    }

    async createApartmentWithMedia(apartmentData: CreateApartmentData): Promise<Apartment> {
        const { media: mediaData, ...apartmentFields } = apartmentData;
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Create apartment
            const apartment = queryRunner.manager.create(Apartment, apartmentFields);
            const savedApartment = await queryRunner.manager.save(Apartment, apartment);

            if (mediaData && Array.isArray(mediaData) && mediaData.length > 0) {
                const apartmentMedia = mediaData.map((media: any) => {
                    return queryRunner.manager.create(ApartmentMedia, {
                        ...media,
                        apartment: savedApartment
                    });
                });
                await queryRunner.manager.save(ApartmentMedia, apartmentMedia);
            }

            await queryRunner.commitTransaction();

            const apartmentWithMedia = await this.repo.findOne({
                where: { id: savedApartment.id },
                relations: ['media', 'area']
            });

            if (!apartmentWithMedia) {
                   throw new BadRequestError('Apartment not found after creation');
            }
            return apartmentWithMedia;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
    async searchAndFilter(query: ApartmentListQuery): Promise<ApartmentSearchResult> {
        const {
            page = 1,
            limit = 10,
            search,
            areaId,
            status,
            isFurnished,
            hasParking,
            sortField = 'createdAt',
            sortOrder = 'DESC',
        } = query;
        const where: any = { isActive: true };
        if (areaId) where.areaId = areaId;
        if (status) where.status = status;
        if (typeof isFurnished === 'boolean') where.isFurnished = isFurnished;
        if (typeof hasParking === 'boolean') where.hasParking = hasParking;
        if (search) {
            where.title = search;
        }
        const order: any = {};
        order[sortField] = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        // Use TypeORM find with select and relations, then map result
        const [apartments, total] = await this.repo.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            order,
            select: [
                'id',
                'title',
                'price',
                'numberOfRooms',
                'numberOfBathrooms',
                'status',
                'createdAt',
            ],
            relations: ['media'],
        });
        return { items:apartments, total, page, limit };
    }
}

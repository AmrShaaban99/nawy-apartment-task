import { injectable, inject } from 'tsyringe';
import { AreaRepository } from './area.repository';
import { AreaDto } from './dtos/area.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundError } from '../../common/errors/http-errors';
import { ICache } from '../../common/interfaces/ICache';

@injectable()
export class AreaService {
  private readonly CACHE_PREFIX = 'areas:';
  private readonly CACHE_TTL = 3600;
  constructor(
    private areaRepository: AreaRepository,
    @inject('ICache') private cache: ICache
  ) {}

  async getAll(): Promise<AreaDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}all`;
    const cached = await this.cache.get<AreaDto[]>(cacheKey);
    if (cached) {
      console.log('Areas list retrieved from cache');
      return cached;
    }
    const areas = await this.areaRepository.getAll();
    await this.cache.set(cacheKey, areas, this.CACHE_TTL);
    console.log('All areas cached for future requests');
    return areas;
  }

  async getById(id: string): Promise<AreaDto | null> {
    const area =await this.areaRepository.getById(id);
    if (!area) {
       throw new NotFoundError(`User with ID ${id} not found`);;
    }
    const data = plainToInstance(AreaDto, area,{excludeExtraneousValues: true});
    return data
  }

  async getByCityId(cityId: string): Promise<AreaDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}city:${cityId}`;
    const cached = await this.cache.get<AreaDto[]>(cacheKey);
    if (cached) {
      console.log('Areas by city retrieved from cache');
      return cached;
    }
    const areas = await this.areaRepository.getByCityId(cityId);
    if (!areas || areas.length === 0) {
      return [];
    }
    await this.cache.set(cacheKey, areas, this.CACHE_TTL);
    return areas;
  }
}

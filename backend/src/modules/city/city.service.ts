import { City } from './entities/city.entity';
import { CityDto } from './dtos/city.dto';
import { inject, injectable } from 'tsyringe';
import { CityRepository } from './city.repository';
import { RedisCacheManager } from '../../common/cache/cacheManager';
import { NotFoundError } from '../../common/errors/http-errors';
import { plainToInstance } from 'class-transformer';
import { ICache } from '../../common/interfaces/ICache';

@injectable()
export class CityService {
  private readonly CACHE_PREFIX = 'cities:';
  private readonly CACHE_TTL = 3600;
  constructor(
    private cityRepository: CityRepository,
     @inject('ICache') private cache: ICache
  ) {}

  async getAll(): Promise<CityDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}all`;
    const cached = await this.cache.get<[]>(cacheKey);
    if (cached) {
      console.log('Cities list retrieved from cache');
      return cached;
    }
    const cities = await this.cityRepository.getAll();

    await this.cache.set(cacheKey, cities, this.CACHE_TTL);
    console.log('All cities cached for future requests');
    return cities;
  }

  async getById(id: string): Promise<CityDto> {
     const city =await this.cityRepository.getById(id);;
      if (!city) {
          throw new NotFoundError(`City with ID ${id} not found`);;
      }
      const data = plainToInstance(CityDto, city,{excludeExtraneousValues: true});
      return data
  }

  async getByCountryId(countryId: string): Promise<CityDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}country:${countryId}`;
    const cached = await this.cache.get<City[]>(cacheKey);
    if (cached) {
      console.log('Cities by country retrieved from cache');
      return cached;
    }
    const cities = await this.cityRepository.getByCountryId(countryId);
    if (!cities || cities.length === 0) {
      return [];
    }
    await this.cache.set(cacheKey, cities, this.CACHE_TTL);
    return cities;
  }
}

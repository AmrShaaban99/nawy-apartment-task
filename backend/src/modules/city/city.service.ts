import { City } from './entities/city.entity';
import { CityDto } from './dtos/city.dto';
import { injectable } from 'tsyringe';
import { CityRepository } from './city.repository';
import { RedisCacheManager } from '../../common/cache/cacheManager';

@injectable()
export class CityService {
  private readonly CACHE_PREFIX = 'cities:';
  private readonly CACHE_TTL = 3600;
  constructor(
    private cityRepository: CityRepository,
    private cache: RedisCacheManager
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

  async getById(id: string): Promise<City | null> {
    return this.cityRepository.getById(id);
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

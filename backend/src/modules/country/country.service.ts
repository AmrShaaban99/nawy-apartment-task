import { injectable } from 'tsyringe';
import { CountryRepository } from './country.repository';
import { CountryListItemDto } from './dtos/country-list.dto';
import { CountryDto } from './dtos/country.dto';
import { RedisCacheManager } from '../../common/cache/cacheManager';

@injectable()
export class CountryService {
  private readonly CACHE_PREFIX = 'countries:';
  private readonly CACHE_TTL = 3600; 
  constructor(
    private countryRepository: CountryRepository,
    private cache: RedisCacheManager
  ) {}

async getList(): Promise<CountryListItemDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}list`;
    const cached = await this.cache.get<CountryListItemDto[]>(cacheKey);
    if (cached) {
      console.log('Countries retrieved from cache');
      return cached;
    }
    const countries = await this.countryRepository.getCountryList(); 

    await this.cache.set(cacheKey, countries, this.CACHE_TTL);
    console.log('Countries cached for future requests');
    return countries;
}

async getAll(): Promise<CountryDto[]> {
    const cacheKey = `${this.CACHE_PREFIX}all`;
    const cached = await this.cache.get<CountryDto[]>(cacheKey);
    if (cached) {
      console.log('Countries list retrieved from cache');
      return cached;
    }
    const countries = await this.countryRepository.getAllCountries();; 

    await this.cache.set(cacheKey, countries, this.CACHE_TTL);
    console.log('All countries cached for future requests');
    return countries;
}
}
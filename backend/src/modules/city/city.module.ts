import { container } from 'tsyringe';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import CityRouter from './city.router';
import { CityRepository } from './city.repository';
import { AppDataSource } from '../dataSource';
import { RedisCacheManager } from '../../common/cache/cacheManager';

export default () => {
  const cityRepository = new CityRepository(AppDataSource);
  const cache = container.resolve(RedisCacheManager);
  const cityService = new CityService(cityRepository, cache);
  const cityController = new CityController(cityService);
  const cityRouter = new CityRouter(cityController);

  return {
    service: cityService,
    controller: cityController,
    router: cityRouter.getRouter(),
  };
};

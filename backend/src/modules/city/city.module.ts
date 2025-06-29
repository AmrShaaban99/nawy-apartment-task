import { container } from 'tsyringe';
import { CityController } from './city.controller';
import CityRouter from './city.router';

export default () => {
  const cityController = container.resolve(CityController);
  const cityRouter = new CityRouter(cityController);

  return {
    controller: cityController,
    router: cityRouter.getRouter(),
  };
};

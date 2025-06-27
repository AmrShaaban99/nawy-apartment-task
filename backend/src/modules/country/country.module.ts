import { container } from 'tsyringe';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import CountryRouter from './country.router';

export default () => {
  const countryService = container.resolve(CountryService);
  const countryController = container.resolve(CountryController);
  const countryRouter = new CountryRouter(countryController);

  return {
    service: countryService,
    controller: countryController,
    router: countryRouter.getRouter(),
  };
};
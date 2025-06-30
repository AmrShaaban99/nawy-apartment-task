import { container } from 'tsyringe';
import { CountryController } from './country.controller';
import CountryRouter from './country.router';

export default () => {
  const countryController = container.resolve(CountryController);
  const countryRouter = new CountryRouter(countryController);

  return {
    controller: countryController,
    router: countryRouter.getRouter(),
  };
};
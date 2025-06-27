import { Router } from 'express';
import { CountryController } from './country.controller';

class CountryRouter {
  countryController: CountryController;

  constructor(countryController: CountryController) {
    this.countryController = countryController;
  }

  getRouter = () => {
    const router = Router();
    router.get('/list', this.countryController.getCountryList);
    router.get('/', this.countryController.getAllCountries);
    return router;
  };
}

export default CountryRouter;

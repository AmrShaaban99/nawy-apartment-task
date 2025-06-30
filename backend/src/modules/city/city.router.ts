import { Router } from 'express';
import { CityController } from './city.controller';

export default class CityRouter {
  private router: Router;

  constructor(private cityController: CityController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.cityController.findAll);
    this.router.get('/country/:countryId', this.cityController.findByCountryId);
  }

  getRouter() {
    return this.router;
  }
}

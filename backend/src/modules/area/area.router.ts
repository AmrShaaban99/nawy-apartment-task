import { Router } from 'express';
import { AreaController } from './area.controller';

export default class AreaRouter {
  private router: Router;

  constructor(private areaController: AreaController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.areaController.findAll);
    this.router.get('/city/:cityId', this.areaController.findByCityId);
  }

  getRouter() {
    return this.router;
  }
}

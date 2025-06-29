import { ApartmentController } from './apartment.controller';
import { s3Upload } from '../../common/middleware/s3Upload';
import { Router } from 'express';

export default class ApartmentRouter {
  private router: Router;

  constructor(private apartmentController: ApartmentController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/filter', this.apartmentController.findAll);
    this.router.get('/:id', this.apartmentController.findById);
    this.router.post(
      '/',
      s3Upload(ApartmentController.getFilesFields()),
      this.apartmentController.create
    );
  }

  getRouter() {
    return this.router;
  }
}
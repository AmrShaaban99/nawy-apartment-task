import { container } from 'tsyringe';
import { ApartmentController } from './apartment.controller';
import ApartmentRouter from './apartment.router';

export default () => {
  const apartmentController = container.resolve(ApartmentController);
  const apartmentRouter = new ApartmentRouter(apartmentController);

  return {
    controller: apartmentController,
    router: apartmentRouter.getRouter(),
  };
};

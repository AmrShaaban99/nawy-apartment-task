import { container } from 'tsyringe';
import { AreaController } from './area.controller';
import AreaRouter from './area.router';

export default () => {
  const areaController = container.resolve(AreaController);
  const areaRouter = new AreaRouter(areaController);

  return {
    controller: areaController,
    router: areaRouter.getRouter(),
  };
};

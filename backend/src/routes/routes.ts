import { Express } from 'express';
import countryModule from '../modules/country/country.module';

export default (app: Express) => {
  const { router: countryRouter } = countryModule();
  app.use('/countries', countryRouter);

};
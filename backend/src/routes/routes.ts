import { Express } from 'express';
import countryModule from '../modules/country/country.module';
import cityModule from '../modules/city/city.module';

export default (app: Express) => {
  const { router: countryRouter } = countryModule();
  app.use('/countries', countryRouter);
  const { router: cityRouter } = cityModule();
  app.use('/cities', cityRouter); // Assuming cities are under the same module
  // Add other module routers here
};
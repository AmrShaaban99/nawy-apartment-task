import { Express } from 'express';
import countryModule from '../modules/country/country.module';
import cityModule from '../modules/city/city.module';
import areaModule from '../modules/area/area.module'; // Assuming you have an area module
import apartmentModule from '../modules/apartment/apartment.module'; // Assuming you have an apartment module
import { swaggerSpec } from '../common/utils/swagger';

export default (app: Express) => {
  const { router: countryRouter } = countryModule();
  app.use('/countries', countryRouter);
  const { router: cityRouter } = cityModule();
  app.use('/cities', cityRouter); 
  const { router: areaRouter } = areaModule();
  app.use('/areas', areaRouter); 

  const { router: apartmentRouter } = apartmentModule();
  app.use('/apartments', apartmentRouter); 

  app.get('/api-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  // Add other module routers here
};
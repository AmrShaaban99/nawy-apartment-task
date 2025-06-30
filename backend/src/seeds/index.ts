// src/seeds/index.ts
import { AppDataSource } from '../config/dataSource';
import { seedCities } from '../modules/city/city.seed';
import { seedCountries } from '../modules/country/country.seed';
import { seedAreas } from '../modules/area/area.seed';

const runSeeds = async () => {
  await AppDataSource.initialize();
  await seedCountries();
  await seedCities();
  await seedAreas();
  await AppDataSource.destroy();

  console.log('All seeds completed');
  process.exit(0);
};

runSeeds().catch((err) => {
  console.error('Global seed failed:', err);
  process.exit(1);
});

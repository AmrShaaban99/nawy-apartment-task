// src/seeds/index.ts
import { seedCountries } from '../modules/country/country.seed';

const runSeeds = async () => {
  await seedCountries();


  console.log('All seeds completed');
  process.exit(0);
};

runSeeds().catch((err) => {
  console.error('Global seed failed:', err);
  process.exit(1);
});

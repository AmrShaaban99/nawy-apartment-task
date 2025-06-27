// 1. Import dependencies and define types
import { AppDataSource } from '../dataSource';
import { City } from './entities/city.entity';
import { Country } from '../country/entities/country.entity';
import { NotFoundError } from '../../common/errors/http-errors';

// Manual city data array, referencing country by name
const manualCities = [
    { name: 'Cairo', countryName: 'Egypt' },
    { name: 'Alexandria', countryName: 'Egypt' },
    { name: 'Giza', countryName: 'Egypt' },
    { name: 'Sharm El Sheikh', countryName: 'Egypt' },
    { name: 'Luxor', countryName: 'Egypt' },
    { name: 'Aswan', countryName: 'Egypt' },
    { name: 'New York', countryName: 'United States' },
    { name: 'Los Angeles', countryName: 'United States' },
    { name: 'Chicago', countryName: 'United States' },
    { name: 'Houston', countryName: 'United States' },
    { name: 'Miami', countryName: 'United States' },
    { name: 'San Francisco', countryName: 'United States' },
    { name: 'London', countryName: 'United Kingdom' },
    { name: 'Manchester', countryName: 'United Kingdom' },
    { name: 'Birmingham', countryName: 'United Kingdom' },
    { name: 'Liverpool', countryName: 'United Kingdom' },
    { name: 'Berlin', countryName: 'Germany' },
    { name: 'Munich', countryName: 'Germany' },
    { name: 'Frankfurt', countryName: 'Germany' },
    { name: 'Hamburg', countryName: 'Germany' },
    { name: 'Paris', countryName: 'France' },
    { name: 'Marseille', countryName: 'France' },
    { name: 'Lyon', countryName: 'France' },
    { name: 'Nice', countryName: 'France' },
    { name: 'Riyadh', countryName: 'Saudi Arabia' },
    { name: 'Jeddah', countryName: 'Saudi Arabia' },
    { name: 'Mecca', countryName: 'Saudi Arabia' },
    { name: 'Medina', countryName: 'Saudi Arabia' },
    { name: 'Dubai', countryName: 'United Arab Emirates' },
    { name: 'Abu Dhabi', countryName: 'United Arab Emirates' },
    { name: 'Sharjah', countryName: 'United Arab Emirates' },
    { name: 'Toronto', countryName: 'Canada' },
    { name: 'Vancouver', countryName: 'Canada' },
    { name: 'Montreal', countryName: 'Canada' },
    { name: 'Calgary', countryName: 'Canada' },
    { name: 'Mumbai', countryName: 'India' },
    { name: 'Delhi', countryName: 'India' },
    { name: 'Bangalore', countryName: 'India' },
    { name: 'Chennai', countryName: 'India' },
    { name: 'Sydney', countryName: 'Australia' },
    { name: 'Melbourne', countryName: 'Australia' },
    { name: 'Brisbane', countryName: 'Australia' },
    { name: 'Perth', countryName: 'Australia' },
    { name: 'Tokyo', countryName: 'Japan' },
    { name: 'Osaka', countryName: 'Japan' },
    { name: 'Kyoto', countryName: 'Japan' },
    { name: 'Nagoya', countryName: 'Japan' },
    { name: 'Moscow', countryName: 'Russia' },
    { name: 'Saint Petersburg', countryName: 'Russia' },
];

export const seedCities = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  const cityRepo = AppDataSource.getRepository(City);
  
  const countryRepo = AppDataSource.getRepository(Country);
  const count = await cityRepo.count();
  if (count > 0) {
    console.log('Cities already seeded');
    return;
  }
  
  // Fetch all countries and build a map by name
  const countries = await countryRepo.find();
    if (countries.length === 0) {
        throw  new NotFoundError('No countries found. Please seed countries first.');
    }
  const countryMap = new Map(countries.map(c => [c.name, c]));

  const cityEntities = manualCities.map((c) => {
    const country = countryMap.get(c.countryName);
    if (!country) {
      return null;
    }
    return cityRepo.create({
      name: c.name,
      countryId: country.id,
    });
  });

  await cityRepo.save(cityEntities.filter((entity): entity is City => entity !== null));

  console.log('Cities seeded');
  process.exit(0);
};

seedCities().catch(error => {
  console.error('City seed failed', error);
  process.exit(1);
});

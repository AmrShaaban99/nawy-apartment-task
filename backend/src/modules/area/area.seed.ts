import { AppDataSource } from '../dataSource';
import { Area } from './entities/area.entity';
import { City } from '../city/entities/city.entity';
import { NotFoundError } from '../../common/errors/http-errors';

// Manual area data array, referencing city by name
const manualAreas = [
    { name: 'Heliopolis', cityName: 'Cairo' },
    { name: 'Maadi', cityName: 'Cairo' },
    { name: 'Zamalek', cityName: 'Cairo' },
    { name: 'Nasr City', cityName: 'Cairo' },
    { name: 'Garden City', cityName: 'Cairo' },
    { name: 'New Cairo', cityName: 'Cairo' },
    { name: 'Shubra', cityName: 'Cairo' },
    { name: 'El Rehab', cityName: 'Cairo' },
    { name: 'El Marg', cityName: 'Cairo' },
    { name: 'El Mokattam', cityName: 'Cairo' },
    { name: 'Mohandessin', cityName: 'Giza' },
    { name: 'Dokki', cityName: 'Giza' },
    { name: '6th of October', cityName: 'Giza' },
    { name: 'Sheikh Zayed', cityName: 'Giza' },
    { name: 'Haram', cityName: 'Giza' },
    { name: 'Faisal', cityName: 'Giza' },
    { name: 'Imbaba', cityName: 'Giza' },
    { name: 'Agouza', cityName: 'Giza' },
    { name: 'Warraq', cityName: 'Giza' },
    { name: 'Bulaq Dakrour', cityName: 'Giza' },
    { name: 'Downtown', cityName: 'Alexandria' },
    { name: 'Sidi Gaber', cityName: 'Alexandria' },
    { name: 'Stanley', cityName: 'Alexandria' },
    { name: 'Smouha', cityName: 'Alexandria' },
    { name: 'Gleem', cityName: 'Alexandria' },
    { name: 'San Stefano', cityName: 'Alexandria' },
    { name: 'Miami', cityName: 'Alexandria' },
    { name: 'Laurent', cityName: 'Alexandria' },
    { name: 'Roushdy', cityName: 'Alexandria' },
    { name: 'Sporting', cityName: 'Alexandria' },
    { name: 'Jumeirah', cityName: 'Dubai' },
    { name: 'Deira', cityName: 'Dubai' },
    { name: 'Marina', cityName: 'Dubai' },
    { name: 'Business Bay', cityName: 'Dubai' },
    { name: 'Al Barsha', cityName: 'Dubai' },
    { name: 'Downtown Dubai', cityName: 'Dubai' },
    { name: 'Palm Jumeirah', cityName: 'Dubai' },
    { name: 'Dubai Silicon Oasis', cityName: 'Dubai' },
    { name: 'Al Quoz', cityName: 'Dubai' },
    { name: 'International City', cityName: 'Dubai' },
    { name: 'Andheri', cityName: 'Mumbai' },
    { name: 'Bandra', cityName: 'Mumbai' },
    { name: 'Versova', cityName: 'Mumbai' },
    { name: 'Juhu', cityName: 'Mumbai' },
    { name: 'Powai', cityName: 'Mumbai' },
    { name: 'Goregaon', cityName: 'Mumbai' },
    { name: 'Malad', cityName: 'Mumbai' },
    { name: 'Borivali', cityName: 'Mumbai' },
    { name: 'Dadar', cityName: 'Mumbai' },
    { name: 'Colaba', cityName: 'Mumbai' },
    { name: 'Brooklyn', cityName: 'New York' },
    { name: 'Manhattan', cityName: 'New York' },
    { name: 'Queens', cityName: 'New York' },
    { name: 'Bronx', cityName: 'New York' },
    { name: 'Staten Island', cityName: 'New York' },
    { name: 'Harlem', cityName: 'New York' },
    { name: 'Chelsea', cityName: 'New York' },
    { name: 'SoHo', cityName: 'New York' },
    { name: 'Tribeca', cityName: 'New York' },
    { name: 'Upper East Side', cityName: 'New York' },
    { name: 'Santa Monica', cityName: 'Los Angeles' },
    { name: 'Hollywood', cityName: 'Los Angeles' },
    { name: 'Beverly Hills', cityName: 'Los Angeles' },
    { name: 'Venice', cityName: 'Los Angeles' },
    { name: 'Downtown LA', cityName: 'Los Angeles' },
    { name: 'Echo Park', cityName: 'Los Angeles' },
    { name: 'Silver Lake', cityName: 'Los Angeles' },
    { name: 'Westwood', cityName: 'Los Angeles' },
    { name: 'Koreatown', cityName: 'Los Angeles' },
    { name: 'Brentwood', cityName: 'Los Angeles' },
    { name: 'Mayfair', cityName: 'London' },
    { name: 'Chelsea', cityName: 'London' },
    { name: 'Kensington', cityName: 'London' },
    { name: 'Notting Hill', cityName: 'London' },
    { name: 'Soho', cityName: 'London' },
    { name: 'Camden', cityName: 'London' },
    { name: 'Shoreditch', cityName: 'London' },
    { name: 'Greenwich', cityName: 'London' },
    { name: 'Islington', cityName: 'London' },
    { name: 'Hampstead', cityName: 'London' },
    { name: 'Montmartre', cityName: 'Paris' },
    { name: 'Le Marais', cityName: 'Paris' },
    { name: 'Latin Quarter', cityName: 'Paris' },
    { name: 'Saint-Germain', cityName: 'Paris' },
    { name: 'Belleville', cityName: 'Paris' },
    { name: 'Bastille', cityName: 'Paris' },
    { name: 'Champs-Élysées', cityName: 'Paris' },
    { name: 'Opéra', cityName: 'Paris' },
    { name: 'Pigalle', cityName: 'Paris' },
    { name: 'La Défense', cityName: 'Paris' },
    { name: 'Centro', cityName: 'Madrid' },
    { name: 'Salamanca', cityName: 'Madrid' },
    { name: 'Chamberí', cityName: 'Madrid' },
    { name: 'Retiro', cityName: 'Madrid' },
    { name: 'Arganzuela', cityName: 'Madrid' },
    { name: 'Tetuán', cityName: 'Madrid' },
    { name: 'Moncloa', cityName: 'Madrid' },
    { name: 'Carabanchel', cityName: 'Madrid' },
    { name: 'Usera', cityName: 'Madrid' },
    { name: 'Barajas', cityName: 'Madrid' }
];

export const seedAreas = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  const areaRepo = AppDataSource.getRepository(Area);
  const cityRepo = AppDataSource.getRepository(City);

  const count = await areaRepo.count();
  if (count > 0) {
    console.log('Areas already seeded');
    return;
  }

  // Fetch all cities and build a map by name
  const cities = await cityRepo.find();
  if (cities.length === 0) {
    throw new NotFoundError('No cities found. Please seed cities first.');
  }
  const cityMap = new Map(cities.map(c => [c.name, c]));

  const areaEntities = manualAreas.map((a) => {
    const city = cityMap.get(a.cityName);
    if (!city) {
      console.warn(`City not found for area: ${a.name}, skipping...`);
      return null;
    }
    return areaRepo.create({
      name: a.name,
      cityId: city.id,
    });
  });

  await areaRepo.save(areaEntities.filter((entity): entity is Area => entity !== null));

  console.log('Areas seeded');
  process.exit(0);
};

seedAreas().catch(error => {
  console.error('Area seed failed', error);
  process.exit(1);
});

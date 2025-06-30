// 1. Import dependencies and define types
import { AppDataSource } from '../../config/dataSource';
import { Country } from './entities/country.entity';

// Manual country data array
const manualCountries = [
  { name: 'Egypt', iso: '🇪🇬', phoneCode: '+20', currency: 'EGP', region: 'Africa' },
  { name: 'United States', iso: '🇺🇸', phoneCode: '+1', currency: 'USD', region: 'North America' },
  { name: 'United Kingdom', iso: '🇬🇧', phoneCode: '+44', currency: 'GBP', region: 'Europe' },
  { name: 'Germany', iso: '🇩🇪', phoneCode: '+49', currency: 'EUR', region: 'Europe' },
  { name: 'France', iso: '🇫🇷', phoneCode: '+33', currency: 'EUR', region: 'Europe' },
  { name: 'Saudi Arabia', iso: '🇸🇦', phoneCode: '+966', currency: 'SAR', region: 'Asia' },
  { name: 'United Arab Emirates', iso: '🇦🇪', phoneCode: '+971', currency: 'AED', region: 'Asia' },
  { name: 'Canada', iso: '🇨🇦', phoneCode: '+1', currency: 'CAD', region: 'North America' },
  { name: 'India', iso: '🇮🇳', phoneCode: '+91', currency: 'INR', region: 'Asia' },
  { name: 'Australia', iso: '🇦🇺', phoneCode: '+61', currency: 'AUD', region: 'Oceania' },
  // Add more countries as needed
];

export const seedCountries = async () => {
  const countryRepo = AppDataSource.getRepository(Country);
  const count = await countryRepo.count();
    if (count > 0) {
        console.log('Countries already seeded');
        return;
    }
  const countryEntities = manualCountries.map((c) => {
    return countryRepo.create({
      name: c.name,
      iso: c.iso,
      phoneCode: c.phoneCode,
      currency: c.currency,
      region: c.region,
    });
  });

  await countryRepo.save(countryEntities);

  console.log(' Countries seeded');
};
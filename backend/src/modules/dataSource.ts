import { DataSource } from 'typeorm';
import { Country } from './/country/entities/country.entity'; // adjust path if needed
import { postgresConfig } from '../config/config';
import { City } from './city/entities/city.entity';
import { Area } from './area/entities/area.entity';
import { Apartment } from './apartment/entities/apartment.entity';
import { ApartmentMedia } from './apartment/entities/apartment-media.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or your DB type
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  entities: [Country,City,Area,Apartment,ApartmentMedia],
  migrations: ['./../migrations/*.ts'], // adjust path if needed
  synchronize:true, // set to false in production
});
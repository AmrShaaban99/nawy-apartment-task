import { DataSource } from 'typeorm';
import { Country } from '../modules/country/entities/country.entity'; 
import { postgresConfig } from './config';
import { City } from '../modules/city/entities/city.entity';
import { Area } from '../modules/area/entities/area.entity';
import { Apartment } from '../modules/apartment/entities/apartment.entity';
import { ApartmentMedia } from '../modules/apartment/entities/apartment-media.entity';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  entities: [Country,City,Area,Apartment,ApartmentMedia],
  migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize:false,
});
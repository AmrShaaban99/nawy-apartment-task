import { DataSource } from 'typeorm';
import { Country } from './/country/entities/country.entity'; // adjust path if needed
import { postgresConfig } from '../config/config';
import { City } from './city/entities/city.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or your DB type
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  entities: [Country,City],
  migrations: ['./../migrations/*.ts'], // adjust path if needed
  synchronize:true, // set to false in production
});
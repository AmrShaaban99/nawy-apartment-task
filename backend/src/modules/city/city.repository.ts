import { injectable } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { City } from './entities/city.entity';

@injectable()
export class CityRepository {
  private cityRepo: Repository<City>;
  constructor(dataSource: DataSource) {
    this.cityRepo = dataSource.getRepository(City);
  }

  async getAll(): Promise<City[]> {
    return this.cityRepo.find({ select: ['id', 'name'] });
  }

  async getById(id: string): Promise<City | null> {
    return this.cityRepo.findOneBy({ id });
  }

  async getByCountryId(countryId: string): Promise<City[]> {
    console.log(`Fetching cities for country ID: ${countryId}`);
    return this.cityRepo.find({ where: { countryId }, select: ['id', 'name'] });
  }
}

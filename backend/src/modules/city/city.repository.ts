import { injectable, inject } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { City } from './entities/city.entity';

@injectable()
export class CityRepository {
  constructor(@inject('DataSource') private dataSource: DataSource) {}

  private get repo(): Repository<City> {
    return this.dataSource.getRepository(City);
  }

  async getAll(): Promise<City[]> {
    return this.repo.find({ select: ['id', 'name'] });
  }

  async getById(id: string): Promise<City | null> {
    return this.repo.findOneBy({ id });
  }

  async getByCountryId(countryId: string): Promise<City[]> {
    return this.repo.find({ where: { countryId }, select: ['id', 'name'] });
  }
}

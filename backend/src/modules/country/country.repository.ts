import { injectable, inject } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@injectable()
export class CountryRepository {
  private countryRepo: Repository<Country>;

  constructor(@inject('DataSource') dataSource: DataSource) {
    this.countryRepo = dataSource.getRepository(Country);
  }

  // Get list of countries with id, name, and flag
  async getCountryList() {
    return this.countryRepo.find({
      select: ['id', 'name', 'iso'],
    });
  }

  // Get all countries with all details
  async getAllCountries() {
    return this.countryRepo.find();
  }
}
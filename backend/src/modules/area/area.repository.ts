import { inject, injectable } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { Area } from './entities/area.entity';

@injectable()
export class AreaRepository {
    constructor(@inject('DataSource') private dataSource: DataSource) {

    }
    private get repo(): Repository<Area> {
        return this.dataSource.getRepository(Area);
    }
  
    async getAll(): Promise<Area[]> {
        return this.repo.find({ select: ['id', 'name'] });
    }

    async getById(id: string): Promise<Area | null> {
        return this.repo.findOneBy({ id });
    }

    async getByCityId(cityId: string): Promise<Area[]> {
        return this.repo.find({ where: { cityId }, select: ['id', 'name'] });
    }
}

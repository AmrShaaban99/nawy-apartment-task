import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppDataSource } from '../../config/dataSource';
import { RedisCacheManager } from '../cache/cacheManager';
import { ICache } from '../interfaces/ICache';


export class DependencyContainer {
  public static configure(): void {
    
    container.register('DataSource', { useValue: AppDataSource });

    container.register<ICache>('ICache', { useClass: RedisCacheManager });
    }
    public static get<T>(identifier: string): T {
        return container.resolve<T>(identifier);
    }
}
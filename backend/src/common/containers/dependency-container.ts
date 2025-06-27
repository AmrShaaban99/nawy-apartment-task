import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppDataSource } from '../../modules/dataSource';
import { RedisCacheManager } from '../cache/cacheManager';


export class DependencyContainer {
  public static configure(): void {
    // Register the DataSource
    container.register('DataSource', { useValue: AppDataSource });
    // Register the RedisCacheManager
    container.register('RedisCacheManager', { useClass: RedisCacheManager });
    }
    public static get<T>(identifier: string): T {
        return container.resolve<T>(identifier);
    }
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Apartment } from '../../apartment/entities/apartment.entity';
import { City } from '../../city/entities/city.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cityId: string;

  @ManyToOne(() => City)
  city: City;

  @OneToMany(() => Apartment, (apartment) => apartment.area)
  apartments: Apartment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  iso: string; 

  @Column({ nullable: true })
  phoneCode: string; 

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  region: string; 

  @OneToMany(() => City, city => city.country)
  cities: City[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
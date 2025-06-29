import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Area } from '../../area/entities/area.entity';
import { ApartmentMedia } from './apartment-media.entity';
import { ApartmentStatusEnum } from '../enum/apartment-status.enum';

@Entity('apartments')
@Index('IDX_apartment_price', ['price']) 
@Index('IDX_apartment_areaId', ['areaId']) 
@Index('IDX_apartment_isFurnished', ['isFurnished']) 
@Index('IDX_apartment_hasParking', ['hasParking']) 
@Index('IDX_apartment_createdAt', ['createdAt']) 
@Index('IDX_apartment_isActive', ['isActive']) 
export class Apartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column()
  sizeInSquareMeters: number;

  @Column()
  numberOfRooms: number;

  @Column()
  numberOfBathrooms: number;

  @Column({ default: false })
  isFurnished: boolean;

  @Column({ default: false })
  hasBalcony: boolean;

  @Column({ default: false })
  hasElevator: boolean;

  @Column({ default: false })
  hasParking: boolean;

  @Column({ default: false })
  hasSecurity: boolean;

  @Column({ nullable: true })
  floorNumber: number;

  @Column({ nullable: true })
  totalFloorsInBuilding: number;

  @Column({ type: 'decimal', nullable: true })
  longitude: number;

  @Column({ type: 'decimal', nullable: true })
  latitude: number;
  
  @Column({ nullable: true })
  streetName: string;
  
  @Column({ nullable: true })
  streetNumber: string;
  
  @Column({
    type: 'enum',
    enum: ApartmentStatusEnum,
    default: ApartmentStatusEnum.AVAILABLE,
  })
  status: ApartmentStatusEnum;

  @Column({ default: true })
  isActive: boolean ;

  @Column({ nullable: true })
  areaId: string;
  @OneToMany(() => ApartmentMedia, (media: ApartmentMedia) => media.apartment, { cascade: true })
  media: ApartmentMedia[];

  @ManyToOne(() => Area, area => area.apartments)
  area: Area;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
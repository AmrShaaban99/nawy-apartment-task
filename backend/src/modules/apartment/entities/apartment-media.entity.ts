import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity('apartment_media')
@Index('IDX_media_apartmentId', ['apartment_id'])
export class ApartmentMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column()
  url: string;

  @ManyToOne(() => Apartment, (apartment) => apartment.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'apartment_id' })
  apartment: Apartment;

  @Column()
  apartment_id: number;
}

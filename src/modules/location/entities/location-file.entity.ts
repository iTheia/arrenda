import { File } from '@modules/files/entities';
import { Location } from './location.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('locationFile')
export class LocationFile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_id: number;

  @ManyToOne(() => File, (file) => file.locations, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column()
  location_id: number;

  @ManyToOne(() => Location, (location) => location.pictures, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'location_id' })
  location: Location;
}

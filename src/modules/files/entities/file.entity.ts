import { Location } from '@modules/location/entities';
import { LocationFile } from '@modules/location/entities/location-file.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('File')
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: true })
  destination: string;

  @OneToMany(() => LocationFile, (location) => location.file)
  locations: LocationFile[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

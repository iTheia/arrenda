import { Location } from '@modules/location/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('character')
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location_id: number;

  @Column()
  age: number;

  @Column()
  species: string;

  @ManyToOne(() => Location, (location) => location.characters, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'location_id' })
  location: Location[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

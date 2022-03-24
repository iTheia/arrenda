import { Character } from '@modules/character/entities';
import { File } from '@modules/files/entities';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LocationFile } from './location-file.entity';

@Entity('location')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  cords: {
    x: number;
    y: number;
  };

  @Column()
  sector: string;

  @OneToMany(() => Character, (character) => character.location)
  characters: Character[];

  @OneToMany(() => LocationFile, (file) => file.location)
  pictures: LocationFile[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

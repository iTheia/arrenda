import { File } from '@modules/files/entities';
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
  sector: number;

  @Column()
  picture_id: number;

  @ManyToOne(() => File, (file) => file.locations)
  @JoinColumn({ name: 'picture_id' })
  picture: File;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

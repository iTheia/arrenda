import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { roles } from '../types';

@Entity('login')
export class Login extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 'basic' })
  role: roles;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  async verifyPassword(password: string) {
    const validPassword = await bcrypt.compare(password, this.password);
    if (!validPassword) {
      throw new Error('Usuario y/o contrasena incorrectos');
    }
  }
}

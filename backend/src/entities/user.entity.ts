import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Trip } from './trip.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50, nullable: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 'beginner' })
  level: 'beginner' | 'intermediate' | 'professional';

  @Column({ type: 'json', nullable: true })
  equipment: string[];

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

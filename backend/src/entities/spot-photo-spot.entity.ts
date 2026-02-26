import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Point,
} from 'typeorm';
import { Spot } from './spot.entity';

@Entity('spot_photo_spots')
export class SpotPhotoSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'spot_id' })
  spotId: string;

  @ManyToOne(() => Spot, (photoSpot) => photoSpot.photoSpots)
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'geometry', srid: 4326, nullable: true })
  location: Point;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'best_time', type: 'text', nullable: true })
  bestTime: string; // JSON: { seasons: [], timeOfDay: [], weather: [] }

  @Column({ type: 'text', nullable: true })
  tips: string;

  @Column({ name: 'recommended_focal_length', type: 'text', nullable: true })
  recommendedFocalLength: string;

  @Column({ name: 'recommended_filters', type: 'simple-array', nullable: true })
  recommendedFilters: string[];

  @Column({ type: 'simple-array', nullable: true })
  photos: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

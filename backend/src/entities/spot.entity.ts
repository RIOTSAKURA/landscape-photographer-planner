import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Point,
} from 'typeorm';
import { TripSpot } from './trip-spot.entity';
import { SpotPhotoSpot } from './spot-photo-spot.entity';

@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'geometry', srid: 4326 })
  location: Point;

  @Column({ name: 'amap_id', length: 50, nullable: true })
  amapId: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number;

  @Column({ name: 'amap_rating', type: 'decimal', precision: 2, scale: 1, nullable: true })
  amapRating: number;

  @Column({ type: 'simple-array', nullable: true })
  photos: string[];

  @Column({ name: 'province', length: 50, nullable: true })
  province: string;

  @Column({ name: 'city', length: 50, nullable: true })
  city: string;

  @Column({ name: 'district', length: 50, nullable: true })
  district: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany(() => TripSpot, (tripSpot) => tripSpot.spot)
  tripSpots: TripSpot[];

  @OneToMany(() => SpotPhotoSpot, (photoSpot) => photoSpot.spot)
  photoSpots: SpotPhotoSpot[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

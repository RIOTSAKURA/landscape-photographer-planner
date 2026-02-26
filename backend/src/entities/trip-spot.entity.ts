import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trip } from './trip.entity';
import { Spot } from './spot.entity';

@Entity('trip_spots')
export class TripSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'trip_id' })
  tripId: string;

  @Column({ name: 'spot_id' })
  spotId: string;

  @ManyToOne(() => Trip, (trip) => trip.tripSpots)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @ManyToOne(() => Spot, (spot) => spot.tripSpots)
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @Column()
  order: number;

  @Column({ name: 'arrive_date', type: 'date', nullable: true })
  arriveDate: Date;

  @Column({ name: 'arrive_time', type: 'time', nullable: true })
  arriveTime: string;

  @Column({ name: 'stay_hours', type: 'decimal', precision: 3, scale: 1, default: 2 })
  stayHours: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

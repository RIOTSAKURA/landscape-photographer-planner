import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { Trip } from '../../entities/trip.entity';
import { TripSpot } from '../../entities/trip-spot.entity';
import { Spot } from '../../entities/spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, TripSpot, Spot])],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}

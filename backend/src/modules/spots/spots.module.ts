import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { Spot } from '../../entities/spot.entity';
import { SpotPhotoSpot } from '../../entities/spot-photo-spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot, SpotPhotoSpot])],
  controllers: [SpotsController],
  providers: [SpotsService],
  exports: [SpotsService],
})
export class SpotsModule {}

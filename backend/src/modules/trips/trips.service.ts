import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Trip } from '../../entities/trip.entity';
import { TripSpot } from '../../entities/trip-spot.entity';
import { Spot } from '../../entities/spot.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
    @InjectRepository(TripSpot)
    private tripSpotRepository: Repository<TripSpot>,
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
  ) {}

  async findByUser(userId: string | null, page = 1, limit = 10) {
    // 第一版本地部署：无用户时获取所有行程
    const whereCondition = userId ? { userId } : { userId: IsNull() };

    const [trips, total] = await this.tripRepository.findAndCount({
      where: whereCondition,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { trips, total, page, limit };
  }

  async findOne(id: string, userId: string | null) {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['tripSpots', 'tripSpots.spot'],
    });

    if (!trip) {
      throw new NotFoundException('行程不存在');
    }

    // 第一版本地部署：无用户时不校验权限
    if (userId && trip.userId !== userId) {
      throw new ForbiddenException('无权访问此行程');
    }

    return trip;
  }

  async create(
    userId: string,
    name: string,
    startDate: Date,
    endDate: Date,
    transport: 'driving' | 'public' | 'mixed',
    spotIds?: string[],
  ) {
    const trip = this.tripRepository.create({
      userId: userId === 'local-user' ? null : userId,
      name,
      startDate,
      endDate,
      transport,
    });

    await this.tripRepository.save(trip);

    if (spotIds && spotIds.length > 0) {
      for (let i = 0; i < spotIds.length; i++) {
        const tripSpot = this.tripSpotRepository.create({
          tripId: trip.id,
          spotId: spotIds[i],
          order: i + 1,
        });
        await this.tripSpotRepository.save(tripSpot);
      }
    }

    return this.findOne(trip.id, userId);
  }

  async update(id: string, userId: string | null, updateData: Partial<Trip>) {
    const trip = await this.findOne(id, userId);
    Object.assign(trip, updateData);
    return this.tripRepository.save(trip);
  }

  async remove(id: string, userId: string | null) {
    const trip = await this.findOne(id, userId);
    await this.tripRepository.remove(trip);
    return { message: '行程已删除' };
  }

  async addSpot(
    tripId: string,
    userId: string | null,
    spotId: string,
    arriveDate?: Date,
    arriveTime?: string,
    stayHours?: number,
  ) {
    await this.findOne(tripId, userId);

    const spot = await this.spotRepository.findOne({ where: { id: spotId } });
    if (!spot) {
      throw new NotFoundException('景点不存在');
    }

    const maxOrder = await this.tripSpotRepository
      .createQueryBuilder('ts')
      .where('ts.tripId = :tripId', { tripId })
      .select('MAX(ts.order)', 'max')
      .getRawOne();

    const tripSpot = this.tripSpotRepository.create({
      tripId,
      spotId,
      order: (maxOrder?.max || 0) + 1,
      arriveDate,
      arriveTime,
      stayHours: stayHours || 2,
    });

    return this.tripSpotRepository.save(tripSpot);
  }

  async reorderSpots(
    tripId: string,
    userId: string | null,
    spotOrder: { tripSpotId: string; order: number }[],
  ) {
    await this.findOne(tripId, userId);

    for (const item of spotOrder) {
      await this.tripSpotRepository.update(item.tripSpotId, { order: item.order });
    }

    return { message: '顺序已更新' };
  }

  async removeSpot(tripId: string, userId: string | null, tripSpotId: string) {
    await this.findOne(tripId, userId);

    const tripSpot = await this.tripSpotRepository.findOne({ where: { id: tripSpotId } });
    if (!tripSpot) {
      throw new NotFoundException('景点记录不存在');
    }

    await this.tripSpotRepository.remove(tripSpot);
    return { message: '景点已从行程中移除' };
  }
}

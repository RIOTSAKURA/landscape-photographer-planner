import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from '../../entities/spot.entity';
import { SpotPhotoSpot } from '../../entities/spot-photo-spot.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private spotRepository: Repository<Spot>,
    @InjectRepository(SpotPhotoSpot)
    private photoSpotRepository: Repository<SpotPhotoSpot>,
  ) {}

  async findAll(province?: string, city?: string) {
    const query = this.spotRepository.createQueryBuilder('spot');

    if (province) {
      query.andWhere('spot.province = :province', { province });
    }
    if (city) {
      query.andWhere('spot.city = :city', { city });
    }

    return query.getMany();
  }

  async search(keyword: string, limit = 10) {
    return this.spotRepository
      .createQueryBuilder('spot')
      .where('spot.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('spot.city LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('spot.province LIKE :keyword', { keyword: `%${keyword}%` })
      .take(limit)
      .getMany();
  }

  async findOne(id: string) {
    const spot = await this.spotRepository.findOne({ where: { id } });
    if (!spot) {
      throw new NotFoundException('景点不存在');
    }
    return spot;
  }

  async getPhotoSpots(spotId: string) {
    return this.photoSpotRepository.find({ where: { spotId } });
  }

  async create(
    name: string,
    latitude: number,
    longitude: number,
    description?: string,
    province?: string,
    city?: string,
  ) {
    const spot = this.spotRepository.create({
      name,
      description,
      province,
      city,
      location: { type: 'Point', coordinates: [longitude, latitude] } as any,
    });
    return this.spotRepository.save(spot);
  }
}

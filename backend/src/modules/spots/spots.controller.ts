import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  async findAll(@Query('province') province?: string, @Query('city') city?: string) {
    return this.spotsService.findAll(province, city);
  }

  @Get('search')
  async search(@Query('keyword') keyword: string, @Query('limit') limit?: number) {
    return this.spotsService.search(keyword, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.spotsService.findOne(id);
  }

  @Get(':id/photo-spots')
  async getPhotoSpots(@Param('id') id: string) {
    return this.spotsService.getPhotoSpots(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body('name') name: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
    @Body('description') description?: string,
    @Body('province') province?: string,
    @Body('city') city?: string,
  ) {
    return this.spotsService.create(name, latitude, longitude, description, province, city);
  }
}

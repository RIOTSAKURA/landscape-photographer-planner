import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';

@Controller('trips')
@UseGuards(OptionalJwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async findAll(@Request() req, @Query('page') page?: number, @Query('limit') limit?: number) {
    // 第一版：无用户时获取所有行程（本地部署模式）
    const userId = req.user?.id || null;
    return this.tripsService.findByUser(userId, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    // 第一版：无用户时不校验权限
    const userId = req.user?.id || null;
    return this.tripsService.findOne(id, userId);
  }

  @Post()
  async create(
    @Request() req,
    @Body('name') name: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
    @Body('transport') transport: 'driving' | 'public' | 'mixed',
    @Body('spotIds') spotIds?: string[],
  ) {
    // 第一版：无用户时使用默认用户 ID（本地部署模式）
    const userId = req.user?.id || 'local-user';
    return this.tripsService.create(
      userId,
      name,
      new Date(startDate),
      new Date(endDate),
      transport,
      spotIds,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateData: Partial<{
      name: string;
      startDate: Date;
      endDate: Date;
      transport: string;
      notes: string;
    }>,
  ) {
    const userId = req.user?.id || null;
    return this.tripsService.update(id, userId, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id || null;
    return this.tripsService.remove(id, userId);
  }

  @Post(':id/spots')
  async addSpot(
    @Param('id') id: string,
    @Request() req,
    @Body('spotId') spotId: string,
    @Body('arriveDate') arriveDate?: string,
    @Body('arriveTime') arriveTime?: string,
    @Body('stayHours') stayHours?: number,
  ) {
    const userId = req.user?.id || null;
    return this.tripsService.addSpot(
      id,
      userId,
      spotId,
      arriveDate ? new Date(arriveDate) : undefined,
      arriveTime,
      stayHours,
    );
  }

  @Put(':id/spots/reorder')
  async reorderSpots(
    @Param('id') id: string,
    @Request() req,
    @Body('spotOrder') spotOrder: { tripSpotId: string; order: number }[],
  ) {
    const userId = req.user?.id || null;
    return this.tripsService.reorderSpots(id, userId, spotOrder);
  }

  @Delete(':id/spots/:tripSpotId')
  async removeSpot(
    @Param('id') id: string,
    @Param('tripSpotId') tripSpotId: string,
    @Request() req,
  ) {
    const userId = req.user?.id || null;
    return this.tripsService.removeSpot(id, userId, tripSpotId);
  }
}

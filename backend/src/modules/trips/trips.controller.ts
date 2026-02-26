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
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async findAll(@Request() req, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.tripsService.findByUser(req.user.id, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.tripsService.findOne(id, req.user.id);
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
    return this.tripsService.create(
      req.user.id,
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
    return this.tripsService.update(id, req.user.id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.tripsService.remove(id, req.user.id);
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
    return this.tripsService.addSpot(
      id,
      req.user.id,
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
    return this.tripsService.reorderSpots(id, req.user.id, spotOrder);
  }

  @Delete(':id/spots/:tripSpotId')
  async removeSpot(
    @Param('id') id: string,
    @Param('tripSpotId') tripSpotId: string,
    @Request() req,
  ) {
    return this.tripsService.removeSpot(id, req.user.id, tripSpotId);
  }
}

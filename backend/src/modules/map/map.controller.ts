import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('search')
  async searchPOI(
    @Query('keyword') keyword: string,
    @Query('city') city?: string,
    @Query('types') types?: string,
  ) {
    return this.mapService.searchPOI(keyword, city, types);
  }

  @Get('around')
  async searchAround(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius?: string,
    @Query('types') types?: string,
  ) {
    return this.mapService.searchAround(
      parseFloat(latitude),
      parseFloat(longitude),
      radius ? parseInt(radius, 10) : 5000,
      types,
    );
  }

  @Get('detail/:id')
  async getPOIDetail(@Query('id') id: string) {
    return this.mapService.getPOIDetail(id);
  }

  @Get('direction/driving')
  async getDrivingRoute(
    @Query('originLat') originLat: string,
    @Query('originLng') originLng: string,
    @Query('destLat') destLat: string,
    @Query('destLng') destLng: string,
    @Query('waypoints') waypoints?: string,
  ) {
    return this.mapService.getDrivingRoute(
      { lat: parseFloat(originLat), lng: parseFloat(originLng) },
      { lat: parseFloat(destLat), lng: parseFloat(destLng) },
      waypoints,
    );
  }

  @Get('geocode')
  async geocode(
    @Query('address') address: string,
    @Query('city') city?: string,
  ) {
    return this.mapService.geocode(address, city);
  }

  @Get('regeocode')
  async regeocode(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    return this.mapService.regeocode(parseFloat(latitude), parseFloat(longitude));
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('now')
  async getCurrentWeather(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    return this.weatherService.getCurrentWeather(
      parseFloat(latitude),
      parseFloat(longitude),
    );
  }

  @Get('forecast')
  async getForecast(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('days') days?: string,
  ) {
    return this.weatherService.getForecast(
      parseFloat(latitude),
      parseFloat(longitude),
      days ? parseInt(days, 10) : 7,
    );
  }

  @Get('astronomy')
  async getAstronomy(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('date') date?: string,
  ) {
    return this.weatherService.getAstronomy(
      parseFloat(latitude),
      parseFloat(longitude),
      date,
    );
  }

  @Get('sunrise-sunset')
  async getSunriseSunset(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('date') date?: string,
  ) {
    return this.weatherService.getSunriseSunset(
      parseFloat(latitude),
      parseFloat(longitude),
      date,
    );
  }

  @Get('moon')
  async getMoonInfo(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('date') date?: string,
  ) {
    return this.weatherService.getMoonInfo(
      parseFloat(latitude),
      parseFloat(longitude),
      date,
    );
  }
}

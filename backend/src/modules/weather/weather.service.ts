import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly baseUrl = 'https://api.qweather.com/v7';
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('QWEATHER_KEY') || '';
  }

  async getCurrentWeather(latitude: number, longitude: number) {
    try {
      const location = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
      const response = await axios.get(`${this.baseUrl}/weather/now`, {
        params: {
          location,
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('获取实时天气失败', error);
      throw error;
    }
  }

  async getForecast(latitude: number, longitude: number, days: number = 7) {
    try {
      const location = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
      const endpoint = days <= 3 ? '3d' : days <= 7 ? '7d' : days <= 15 ? '15d' : '30d';

      const response = await axios.get(`${this.baseUrl}/weather/${endpoint}`, {
        params: {
          location,
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('获取天气预报失败', error);
      throw error;
    }
  }

  async getAstronomy(latitude: number, longitude: number, date?: string) {
    try {
      const location = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
      const dateStr = date || new Date().toISOString().split('T')[0];

      const [sunriseResponse, moonResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/astronomy/sunrise`, {
          params: { location, date: dateStr, key: this.apiKey },
        }),
        axios.get(`${this.baseUrl}/astronomy/moon`, {
          params: { location, date: dateStr, key: this.apiKey },
        }),
      ]);

      return {
        sunrise: sunriseResponse.data,
        moon: moonResponse.data,
      };
    } catch (error) {
      this.logger.error('获取天文数据失败', error);
      throw error;
    }
  }

  async getSunriseSunset(latitude: number, longitude: number, date?: string) {
    try {
      const location = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
      const dateStr = date || new Date().toISOString().split('T')[0];

      const response = await axios.get(`${this.baseUrl}/astronomy/sunrise`, {
        params: {
          location,
          date: dateStr,
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('获取日出日落失败', error);
      throw error;
    }
  }

  async getMoonInfo(latitude: number, longitude: number, date?: string) {
    try {
      const location = `${longitude.toFixed(2)},${latitude.toFixed(2)}`;
      const dateStr = date || new Date().toISOString().split('T')[0];

      const response = await axios.get(`${this.baseUrl}/astronomy/moon`, {
        params: {
          location,
          date: dateStr,
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('获取月相信息失败', error);
      throw error;
    }
  }
}

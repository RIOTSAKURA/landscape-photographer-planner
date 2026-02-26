import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);
  private readonly baseUrl = 'https://restapi.amap.com/v3';
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('AMAP_KEY') || '';
  }

  async searchPOI(keyword: string, city?: string, types?: string) {
    try {
      const params: Record<string, string> = {
        key: this.apiKey,
        keywords: keyword,
        extensions: 'all',
      };

      if (city) {
        params.city = city;
        params.citylimit = 'true';
      }

      if (types) {
        params.types = types;
      }

      const response = await axios.get(`${this.baseUrl}/place/text`, { params });
      return response.data;
    } catch (error) {
      this.logger.error('搜索POI失败', error);
      throw error;
    }
  }

  async searchAround(
    latitude: number,
    longitude: number,
    radius: number = 5000,
    types?: string,
  ) {
    try {
      const params: Record<string, string> = {
        key: this.apiKey,
        location: `${longitude},${latitude}`,
        radius: radius.toString(),
        extensions: 'all',
      };

      if (types) {
        params.types = types;
      }

      const response = await axios.get(`${this.baseUrl}/place/around`, { params });
      return response.data;
    } catch (error) {
      this.logger.error('周边搜索失败', error);
      throw error;
    }
  }

  async getPOIDetail(id: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/place/detail`, {
        params: {
          key: this.apiKey,
          id,
          extensions: 'all',
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error('获取POI详情失败', error);
      throw error;
    }
  }

  async getDrivingRoute(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    waypoints?: string,
  ) {
    try {
      const params: Record<string, string> = {
        key: this.apiKey,
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`,
        extensions: 'all',
      };

      if (waypoints) {
        params.waypoints = waypoints;
      }

      const response = await axios.get(`${this.baseUrl}/direction/driving`, { params });
      return response.data;
    } catch (error) {
      this.logger.error('获取驾车路线失败', error);
      throw error;
    }
  }

  async geocode(address: string, city?: string) {
    try {
      const params: Record<string, string> = {
        key: this.apiKey,
        address,
      };

      if (city) {
        params.city = city;
      }

      const response = await axios.get(`${this.baseUrl}/geocode/geo`, { params });
      return response.data;
    } catch (error) {
      this.logger.error('地理编码失败', error);
      throw error;
    }
  }

  async regeocode(latitude: number, longitude: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/geocode/regeo`, {
        params: {
          key: this.apiKey,
          location: `${longitude},${latitude}`,
          extensions: 'all',
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error('逆地理编码失败', error);
      throw error;
    }
  }
}

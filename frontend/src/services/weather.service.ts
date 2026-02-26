import api from './api';
import { WeatherNow, WeatherForecast, AstronomyData, MoonData } from '../types/weather';

export const weatherService = {
  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherNow> {
    const response = await api.get<{ now: WeatherNow }>('/weather/now', {
      params: { latitude, longitude },
    });
    return response.data.now;
  },

  async getForecast(
    latitude: number,
    longitude: number,
    days?: number
  ): Promise<WeatherForecast[]> {
    const response = await api.get<{ daily: WeatherForecast[] }>('/weather/forecast', {
      params: { latitude, longitude, days },
    });
    return response.data.daily;
  },

  async getAstronomy(
    latitude: number,
    longitude: number,
    date?: string
  ): Promise<{ sunrise: AstronomyData; moon: MoonData }> {
    const response = await api.get('/weather/astronomy', {
      params: { latitude, longitude, date },
    });
    return response.data;
  },

  async getSunriseSunset(
    latitude: number,
    longitude: number,
    date?: string
  ): Promise<AstronomyData> {
    const response = await api.get<AstronomyData>('/weather/sunrise-sunset', {
      params: { latitude, longitude, date },
    });
    return response.data;
  },

  async getMoonInfo(latitude: number, longitude: number, date?: string): Promise<MoonData> {
    const response = await api.get<MoonData>('/weather/moon', {
      params: { latitude, longitude, date },
    });
    return response.data;
  },
};

export default weatherService;

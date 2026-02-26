import api from './api';
import { Spot, PhotoSpot } from '../types/spot';

export const spotService = {
  async getAll(province?: string, city?: string): Promise<Spot[]> {
    const params = new URLSearchParams();
    if (province) params.append('province', province);
    if (city) params.append('city', city);
    const response = await api.get<Spot[]>(`/spots?${params.toString()}`);
    return response.data;
  },

  async search(keyword: string, limit?: number): Promise<Spot[]> {
    const params = new URLSearchParams();
    params.append('keyword', keyword);
    if (limit) params.append('limit', limit.toString());
    const response = await api.get<Spot[]>(`/spots/search?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Spot> {
    const response = await api.get<Spot>(`/spots/${id}`);
    return response.data;
  },

  async getPhotoSpots(spotId: string): Promise<PhotoSpot[]> {
    const response = await api.get<PhotoSpot[]>(`/spots/${spotId}/photo-spots`);
    return response.data;
  },
};

export default spotService;

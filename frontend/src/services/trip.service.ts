import api from './api';
import { Trip, TripSpot, CreateTripDto, TripListResponse } from '../types/trip';

export const tripService = {
  async getAll(page?: number, limit?: number): Promise<TripListResponse> {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    const response = await api.get<TripListResponse>(`/trips?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Trip> {
    const response = await api.get<Trip>(`/trips/${id}`);
    return response.data;
  },

  async create(data: CreateTripDto): Promise<Trip> {
    const response = await api.post<Trip>('/trips', data);
    return response.data;
  },

  async update(
    id: string,
    data: Partial<{
      name: string;
      startDate: Date;
      endDate: Date;
      transport: string;
      notes: string;
    }>
  ): Promise<Trip> {
    const response = await api.put<Trip>(`/trips/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/trips/${id}`);
  },

  async addSpot(
    tripId: string,
    spotId: string,
    arriveDate?: Date,
    arriveTime?: string,
    stayHours?: number
  ): Promise<TripSpot> {
    const response = await api.post<TripSpot>(`/trips/${tripId}/spots`, {
      spotId,
      arriveDate,
      arriveTime,
      stayHours,
    });
    return response.data;
  },

  async reorderSpots(
    tripId: string,
    spotOrder: { tripSpotId: string; order: number }[]
  ): Promise<void> {
    await api.put(`/trips/${tripId}/spots/reorder`, { spotOrder });
  },

  async removeSpot(tripId: string, tripSpotId: string): Promise<void> {
    await api.delete(`/trips/${tripId}/spots/${tripSpotId}`);
  },
};

export default tripService;

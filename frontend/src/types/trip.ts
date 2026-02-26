import { Spot } from './spot';

export interface Trip {
  id: string;
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  transport: 'driving' | 'public' | 'mixed';
  notes?: string;
  tripSpots?: TripSpot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TripSpot {
  id: string;
  tripId: string;
  spotId: string;
  spot?: Spot;
  order: number;
  arriveDate?: Date;
  arriveTime?: string;
  stayHours: number;
  notes?: string;
  createdAt: Date;
}

export interface CreateTripDto {
  name: string;
  startDate: string;
  endDate: string;
  transport: 'driving' | 'public' | 'mixed';
  spotIds?: string[];
}

export interface TripListResponse {
  trips: Trip[];
  total: number;
  page: number;
  limit: number;
}

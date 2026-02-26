export interface Spot {
  id: string;
  name: string;
  description?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  amapId?: string;
  rating?: number;
  amapRating?: number;
  photos?: string[];
  province?: string;
  city?: string;
  district?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoSpot {
  id: string;
  spotId: string;
  name: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  description?: string;
  bestTime?: string;
  tips?: string;
  recommendedFocalLength?: string;
  recommendedFilters?: string[];
  photos?: string[];
}

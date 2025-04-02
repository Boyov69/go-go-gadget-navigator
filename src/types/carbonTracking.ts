
/**
 * Carbon Tracking Type Definitions
 */

import { VehicleCategory } from './providerApi';

export interface CarbonEmissionFactor {
  vehicleCategory: VehicleCategory;
  emissionGramsPerKm: number;
  regionSpecificFactors?: {
    [regionName: string]: number; // Multiplier for region-specific adjustments
  };
}

export interface CarbonFootprint {
  userId?: string;
  tripId?: string;
  distanceKm: number;
  vehicleCategory: VehicleCategory;
  emissionGrams: number;
  date: Date;
  isOffset: boolean;
}

export interface UserCarbonSummary {
  userId: string;
  totalEmissionsGrams: number;
  offsetEmissionsGrams: number;
  carbonSaved: number; // Compared to average transportation emissions
  footprintBreakdown: {
    [category in VehicleCategory]?: number;
  };
  monthlyStats: {
    month: string; // YYYY-MM format
    emissionsGrams: number;
    offsetGrams: number;
  }[];
}

export interface CarbonOffsetProject {
  id: string;
  name: string;
  description: string;
  locationName: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  pricePerTonCO2: number;
  totalCO2Offset: number; // in tons
  imageUrl?: string;
  projectUrl?: string;
  certificationType: 'Gold Standard' | 'Verified Carbon Standard' | 'Green-e' | 'Other';
}

export interface CarbonTrackingServiceInterface {
  // Calculate carbon emissions for a trip
  calculateEmissions(distanceKm: number, vehicleCategory: VehicleCategory, region?: string): Promise<number>;
  
  // Track carbon footprint for a completed trip
  trackTripFootprint(tripId: string, distanceKm: number, vehicleCategory: VehicleCategory): Promise<CarbonFootprint>;
  
  // Get user's carbon footprint summary
  getUserCarbonSummary(userId: string, timeframe?: 'week' | 'month' | 'year' | 'all'): Promise<UserCarbonSummary>;
  
  // Get available carbon offset projects
  getOffsetProjects(): Promise<CarbonOffsetProject[]>;
  
  // Purchase carbon offsets
  purchaseOffset(
    userId: string, 
    projectId: string, 
    amountKgCO2: number
  ): Promise<{ 
    success: boolean;
    certificateId?: string;
    amountPaid?: number;
  }>;
  
  // Get emission factors for different vehicle types
  getEmissionFactors(): Promise<CarbonEmissionFactor[]>;
  
  // Compare emissions between transportation methods for a route
  compareEmissions(distanceKm: number): Promise<{
    vehicleCategory: VehicleCategory;
    emissionGrams: number;
  }[]>;
}


/**
 * Provider API Interface Standards
 * This file defines the standard API interfaces for third-party transportation providers
 * to integrate with the platform.
 */

import { WalletCurrency } from './wallet';

export enum VehicleCategory {
  CAR = 'car',
  TAXI = 'taxi',
  SHUTTLE = 'shuttle',
  BUS = 'bus',
  TRAIN = 'train',
  TRAM = 'tram',
  METRO = 'metro',
  FERRY = 'ferry',
  // Micro-mobility options
  BIKE = 'bike',
  SCOOTER = 'scooter',
  MOPED = 'moped',
  E_BIKE = 'e-bike',
  E_SCOOTER = 'e-scooter'
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface VehicleAvailability {
  id: string;
  providerId: string;
  category: VehicleCategory;
  location: GeoLocation;
  batteryLevel?: number; // For electric vehicles
  rangeKm?: number;
  pricePerMinute?: number;
  pricePerKm?: number;
  isAvailable: boolean;
  model?: string;
  licensePlate?: string;
}

export interface RouteSegment {
  startLocation: GeoLocation;
  endLocation: GeoLocation;
  distance: number; // in kilometers
  duration: number; // in minutes
  carbonEmission: number; // in grams of CO2
  price: number;
  currency: WalletCurrency;
  vehicleCategory: VehicleCategory;
}

export interface Route {
  segments: RouteSegment[];
  totalDistance: number; // in kilometers
  totalDuration: number; // in minutes
  totalCarbonEmission: number; // in grams of CO2
  totalPrice: number;
  currency: WalletCurrency;
}

export interface BookingRequest {
  userId: string;
  vehicleId: string;
  startLocation: GeoLocation;
  endLocation?: GeoLocation;
  startTime: Date;
  endTime?: Date;
  paymentMethod: 'wallet' | 'credit_card' | 'subscription';
}

export interface BookingResponse {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'failed';
  vehicleId: string;
  unlockCode?: string;
  startTime: Date;
  estimatedEndTime?: Date;
  price: number;
  currency: WalletCurrency;
}

export interface ProviderCredentials {
  apiKey: string;
  providerId: string;
  environment: 'production' | 'sandbox';
}

export interface ProviderApiInterface {
  // Vehicle availability
  getAvailableVehicles(location: GeoLocation, radius: number): Promise<VehicleAvailability[]>;
  
  // Route planning
  calculateRoute(
    startLocation: GeoLocation, 
    endLocation: GeoLocation,
    vehicleCategories?: VehicleCategory[]
  ): Promise<Route[]>;
  
  // Booking
  createBooking(booking: BookingRequest): Promise<BookingResponse>;
  cancelBooking(bookingId: string): Promise<{ success: boolean; refundAmount?: number }>;
  
  // Vehicle status
  getVehicleStatus(vehicleId: string): Promise<VehicleAvailability & { 
    isLocked: boolean;
    isInUse: boolean;
    currentBookingId?: string;
  }>;
  
  // Provider-specific actions
  unlockVehicle(bookingId: string): Promise<{ success: boolean }>;
  lockVehicle(bookingId: string): Promise<{ success: boolean; tripSummary?: { 
    distance: number;
    duration: number;
    price: number;
    carbonEmission: number;
  }}>;
}

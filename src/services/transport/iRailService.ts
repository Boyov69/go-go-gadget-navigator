
import axios from 'axios';

export interface iRailStation {
  id: string;
  name: string;
  alternative_fr?: string;
  alternative_nl?: string;
  alternative_de?: string;
  alternative_en?: string;
  country_code: string;
  latitude: number;
  longitude: number;
  avg_stop_times?: number;
}

export interface iRailDeparture {
  id: string;
  station: string;
  station_id: string;
  time: number;
  delay: number;
  vehicle: string;
  platform: string;
  platforminfo: {
    name: string;
    normal: boolean;
  };
  canceled: boolean;
  left: boolean;
  direction: {
    name: string;
  };
  stops?: Array<{
    station: string;
    station_id: string;
    time: number;
    delay: number;
    platform: string;
    platforminfo: {
      name: string;
      normal: boolean;
    };
    canceled: boolean;
  }>;
}

export interface iRailLiveboardResponse {
  version: string;
  timestamp: number;
  station: string;
  stationinfo: {
    id: string;
    locationX: number;
    locationY: number;
    name: string;
  };
  departures: {
    number: number;
    departure: iRailDeparture[];
  };
}

/**
 * Service for interacting with the iRail API
 * Based on https://github.com/iRail/stations
 */
export class iRailService {
  private static readonly API_BASE_URL = 'https://api.irail.be/';
  
  /**
   * Get all Belgian train stations
   */
  static async getAllStations(): Promise<iRailStation[]> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}stations/?format=json&lang=en`);
      return response.data.station;
    } catch (error) {
      console.error('Error fetching iRail stations:', error);
      return [];
    }
  }
  
  /**
   * Search for stations by name
   */
  static async searchStations(query: string): Promise<iRailStation[]> {
    try {
      const allStations = await this.getAllStations();
      const normalizedQuery = query.toLowerCase().trim();
      
      return allStations.filter(station => {
        // Search in all language variants of the name
        return (
          station.name.toLowerCase().includes(normalizedQuery) ||
          (station.alternative_en && station.alternative_en.toLowerCase().includes(normalizedQuery)) ||
          (station.alternative_fr && station.alternative_fr.toLowerCase().includes(normalizedQuery)) ||
          (station.alternative_nl && station.alternative_nl.toLowerCase().includes(normalizedQuery)) ||
          (station.alternative_de && station.alternative_de.toLowerCase().includes(normalizedQuery))
        );
      });
    } catch (error) {
      console.error('Error searching iRail stations:', error);
      return [];
    }
  }
  
  /**
   * Get liveboard (departures) for a specific station
   */
  static async getLiveboard(stationId: string): Promise<iRailDeparture[]> {
    try {
      const response = await axios.get<iRailLiveboardResponse>(
        `${this.API_BASE_URL}liveboard/?id=${stationId}&format=json&lang=en`
      );
      
      return response.data.departures.departure;
    } catch (error) {
      console.error('Error fetching iRail liveboard:', error);
      return [];
    }
  }
  
  /**
   * Format departure time from Unix timestamp
   */
  static formatDepartureTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  /**
   * Calculate delay in minutes
   */
  static calculateDelayMinutes(delay: number): number {
    return Math.floor(delay / 60);
  }
  
  /**
   * Get the vehicle number from the vehicle ID
   */
  static getTrainNumber(vehicleId: string): string {
    // Vehicle IDs are typically in format "BE.NMBS.IC1234" or similar
    const parts = vehicleId.split('.');
    if (parts.length > 2) {
      return parts[2]; // Return the last part (train number)
    }
    return vehicleId;
  }
  
  /**
   * Convert iRail departures to the app's train info format
   */
  static convertToTrainInfo(departures: iRailDeparture[]): {
    id: string;
    number: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    platform: string;
    status: "on-time" | "delayed" | "cancelled";
    delayMinutes?: number;
  }[] {
    return departures.map(departure => {
      const status = departure.canceled ? 
        "cancelled" : 
        (departure.delay > 0 ? "delayed" : "on-time");
      
      const delayMinutes = this.calculateDelayMinutes(departure.delay);
      const departureTime = this.formatDepartureTime(departure.time);
      
      // Calculate arrival time based on delay
      let arrivalTime = departureTime;
      if (departure.stops && departure.stops.length > 0) {
        const lastStop = departure.stops[departure.stops.length - 1];
        arrivalTime = this.formatDepartureTime(lastStop.time);
      }
      
      return {
        id: departure.id,
        number: this.getTrainNumber(departure.vehicle),
        origin: departure.station,
        destination: departure.direction.name,
        departureTime,
        arrivalTime,
        platform: departure.platforminfo.name,
        status,
        ...(delayMinutes > 0 ? { delayMinutes } : {})
      };
    });
  }
}

export default iRailService;

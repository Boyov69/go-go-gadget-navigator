
import axios from 'axios';

// Define types for API responses
export interface TransportStop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface TransportSchedule {
  stopId: string;
  arrivals: {
    id: string;
    line: string;
    destination: string;
    scheduledTime: string;
    expectedTime: string;
    platform?: string;
    status: 'on-time' | 'delayed' | 'cancelled';
    delayMinutes?: number;
  }[];
}

export interface TransportRoute {
  id: string;
  segments: {
    type: 'train' | 'bus' | 'tram' | 'metro' | 'walk';
    line?: string;
    from: {
      name: string;
      time: string;
      location?: {
        lat: number;
        lng: number;
      };
    };
    to: {
      name: string;
      time: string;
      location?: {
        lat: number; 
        lng: number;
      };
    };
    operator?: string;
    duration: number; // in minutes
    distance?: number; // in km
  }[];
  duration: number; // in minutes
  transfers: number;
}

// API Configuration for different transport providers
const apiConfig = {
  // NMBS/SNCB (Belgian Railways)
  irail: {
    baseUrl: 'https://api.irail.be/',
    endpoints: {
      stations: '/stations',
      liveboard: '/liveboard',
      connections: '/connections',
      vehicle: '/vehicle',
    }
  },
  
  // De Lijn (Flanders buses and trams)
  deLijn: {
    baseUrl: 'https://data.delijn.be/api/',
    endpoints: {
      stops: '/stops',
      schedule: '/schedule',
      vehicles: '/vehicles',
    }
  },
  
  // MIVB/STIB (Brussels public transport)
  stib: {
    baseUrl: 'https://opendata.stib-mivb.be/api/',
    endpoints: {
      stops: '/stops',
      passages: '/passages',
      lines: '/lines',
    }
  },
  
  // TEC (Wallonia buses)
  tec: {
    baseUrl: 'https://www.letec.be/api/',
    endpoints: {
      stops: '/stops',
      schedule: '/schedule',
      lines: '/lines',
    }
  }
};

// Helper for API key management - in a real app, these would be stored securely
const getApiKey = (provider: 'irail' | 'deLijn' | 'stib' | 'tec') => {
  // Placeholder for API key management
  // In a production app, you would use environment variables or a secure storage
  const mockApiKeys = {
    irail: '', // iRail doesn't require API key for basic usage
    deLijn: 'YOUR_DE_LIJN_API_KEY',
    stib: 'YOUR_STIB_API_KEY',
    tec: 'YOUR_TEC_API_KEY',
  };
  
  return mockApiKeys[provider];
};

// Create axios instances for each provider
const createApiClient = (provider: 'irail' | 'deLijn' | 'stib' | 'tec') => {
  const config = apiConfig[provider];
  const apiKey = getApiKey(provider);
  
  return axios.create({
    baseURL: config.baseUrl,
    headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
  });
};

// API service for public transportation data
const PublicTransportApiService = {
  // Search for train stations (iRail API)
  searchTrainStations: async (query: string): Promise<TransportStop[]> => {
    try {
      // This would normally use the real API
      const irailClient = createApiClient('irail');
      console.log(`Searching for train stations with query: ${query}`);
      
      // In a real implementation, you'd make the API call:
      // const response = await irailClient.get(`${apiConfig.irail.endpoints.stations}/?q=${query}`);
      // return response.data.stations;
      
      // For now, return mock data
      return mockData.trainStations.filter(station => 
        station.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error fetching train stations:', error);
      throw error;
    }
  },
  
  // Get train station schedule (iRail API)
  getTrainStationSchedule: async (stationId: string): Promise<TransportSchedule> => {
    try {
      console.log(`Getting schedule for train station: ${stationId}`);
      // In a real implementation:
      // const irailClient = createApiClient('irail');
      // const response = await irailClient.get(`${apiConfig.irail.endpoints.liveboard}/?id=${stationId}`);
      // return formatScheduleData(response.data);
      
      // Mock data
      return {
        stopId: stationId,
        arrivals: mockData.trainArrivals
      };
    } catch (error) {
      console.error('Error fetching train schedule:', error);
      throw error;
    }
  },
  
  // Search for bus stops (De Lijn API)
  searchBusStops: async (query: string, provider: 'deLijn' | 'stib' | 'tec' = 'deLijn'): Promise<TransportStop[]> => {
    try {
      console.log(`Searching for bus stops with query: ${query}, provider: ${provider}`);
      // In a real implementation, you would call the appropriate API
      
      // Mock data
      return mockData.busStops.filter(stop => 
        stop.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error(`Error fetching bus stops for ${provider}:`, error);
      throw error;
    }
  },
  
  // Get bus stop schedule
  getBusStopSchedule: async (stopId: string, provider: 'deLijn' | 'stib' | 'tec' = 'deLijn'): Promise<TransportSchedule> => {
    try {
      console.log(`Getting schedule for bus stop: ${stopId}, provider: ${provider}`);
      // In a real implementation, you would call the appropriate API
      
      // Mock data
      return {
        stopId: stopId,
        arrivals: mockData.busArrivals
      };
    } catch (error) {
      console.error(`Error fetching bus schedule for ${provider}:`, error);
      throw error;
    }
  },
  
  // Search for routes between two points
  searchRoutes: async (
    from: { lat: number; lng: number; name?: string } | string,
    to: { lat: number; lng: number; name?: string } | string,
    departureTime?: Date
  ): Promise<TransportRoute[]> => {
    try {
      console.log(`Searching for routes from ${JSON.stringify(from)} to ${JSON.stringify(to)}`);
      // In a real implementation, you would use a routing API
      
      // Mock data
      return mockData.routes;
    } catch (error) {
      console.error('Error searching for routes:', error);
      throw error;
    }
  },
  
  // Find nearby public transport stops
  findNearbyStops: async (
    location: { lat: number; lng: number },
    radius: number = 1000,
    types: ('train' | 'bus' | 'tram' | 'metro')[] = ['train', 'bus', 'tram', 'metro']
  ): Promise<TransportStop[]> => {
    try {
      console.log(`Finding stops near ${location.lat},${location.lng} within ${radius}m`);
      // In a real implementation, you would call various APIs and combine results
      
      // Mock data - filter by distance calculation
      return mockData.allStops.filter(stop => {
        // Calculate rough distance (this is just for mock purposes)
        const distance = calculateDistance(
          location.lat, location.lng,
          stop.location.lat, stop.location.lng
        );
        return distance <= radius / 1000; // Convert meters to km
      });
    } catch (error) {
      console.error('Error finding nearby stops:', error);
      throw error;
    }
  }
};

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return parseFloat(distance.toFixed(1));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

// Mock data for development
const mockData = {
  trainStations: [
    {
      id: 'BE.NMBS.008812005',
      name: 'Brussels Central',
      location: { lat: 50.845, lng: 4.357 }
    },
    {
      id: 'BE.NMBS.008814001',
      name: 'Brussels South',
      location: { lat: 50.8358, lng: 4.3341 }
    },
    {
      id: 'BE.NMBS.008813003',
      name: 'Brussels North',
      location: { lat: 50.86, lng: 4.361 }
    },
    {
      id: 'BE.NMBS.008821006',
      name: 'Antwerp Central',
      location: { lat: 51.2172, lng: 4.4211 }
    },
    {
      id: 'BE.NMBS.008892007',
      name: 'Ghent Sint-Pieters',
      location: { lat: 51.0356, lng: 3.7105 }
    }
  ],
  
  busStops: [
    {
      id: 'DL:107298',
      name: 'Brussels North Station',
      location: { lat: 50.8598, lng: 4.3608 }
    },
    {
      id: 'MIVB:1452',
      name: 'De Brouckère',
      location: { lat: 50.8505, lng: 4.3536 }
    },
    {
      id: 'MIVB:1234',
      name: 'Brussels Central',
      location: { lat: 50.8452, lng: 4.3566 }
    },
    {
      id: 'TEC:4312',
      name: 'Porte de Namur',
      location: { lat: 50.8388, lng: 4.3682 }
    }
  ],
  
  trainArrivals: [
    {
      id: 'train1',
      line: 'IC 512',
      destination: 'Antwerp Central',
      scheduledTime: '10:15',
      expectedTime: '10:15',
      platform: '3',
      status: 'on-time',
    },
    {
      id: 'train2',
      line: 'IC 1545',
      destination: 'Ghent Sint-Pieters',
      scheduledTime: '10:25',
      expectedTime: '10:35',
      platform: '4',
      status: 'delayed',
      delayMinutes: 10
    },
    {
      id: 'train3',
      line: 'IC 2806',
      destination: 'Liège-Guillemins',
      scheduledTime: '10:32',
      expectedTime: '10:32',
      platform: '6',
      status: 'on-time',
    },
    {
      id: 'train4',
      line: 'P 8089',
      destination: 'Namur',
      scheduledTime: '10:45',
      expectedTime: '10:45',
      platform: '8',
      status: 'cancelled',
    }
  ],
  
  busArrivals: [
    {
      id: 'bus1',
      line: '71',
      destination: 'Delta',
      scheduledTime: '10:05',
      expectedTime: '10:05',
      status: 'on-time',
    },
    {
      id: 'bus2',
      line: '45',
      destination: 'Sint-Gillis',
      scheduledTime: '10:12',
      expectedTime: '10:17',
      status: 'delayed',
      delayMinutes: 5
    },
    {
      id: 'bus3',
      line: '126',
      destination: 'Brussels Airport',
      scheduledTime: '10:20',
      expectedTime: '10:20',
      status: 'on-time',
    },
    {
      id: 'bus4',
      line: 'W',
      destination: 'Waterloo',
      scheduledTime: '10:35',
      expectedTime: '10:35',
      status: 'on-time',
    }
  ],
  
  routes: [
    {
      id: 'route1',
      segments: [
        {
          type: 'walk',
          from: {
            name: 'Current Location',
            time: '10:00',
            location: { lat: 50.8467, lng: 4.3525 }
          },
          to: {
            name: 'Brussels Central Station',
            time: '10:10',
            location: { lat: 50.845, lng: 4.357 }
          },
          duration: 10,
          distance: 0.8
        },
        {
          type: 'train',
          line: 'IC 512',
          from: {
            name: 'Brussels Central',
            time: '10:15',
            location: { lat: 50.845, lng: 4.357 }
          },
          to: {
            name: 'Antwerp Central',
            time: '10:55',
            location: { lat: 51.2172, lng: 4.4211 }
          },
          operator: 'NMBS/SNCB',
          duration: 40
        }
      ],
      duration: 50,
      transfers: 0
    },
    {
      id: 'route2',
      segments: [
        {
          type: 'walk',
          from: {
            name: 'Current Location',
            time: '10:00',
            location: { lat: 50.8467, lng: 4.3525 }
          },
          to: {
            name: 'De Brouckère',
            time: '10:05',
            location: { lat: 50.8505, lng: 4.3536 }
          },
          duration: 5,
          distance: 0.4
        },
        {
          type: 'metro',
          line: '1',
          from: {
            name: 'De Brouckère',
            time: '10:10',
            location: { lat: 50.8505, lng: 4.3536 }
          },
          to: {
            name: 'Arts-Loi',
            time: '10:15',
            location: { lat: 50.8476, lng: 4.3661 }
          },
          operator: 'STIB/MIVB',
          duration: 5
        },
        {
          type: 'bus',
          line: '71',
          from: {
            name: 'Arts-Loi',
            time: '10:20',
            location: { lat: 50.8476, lng: 4.3661 }
          },
          to: {
            name: 'ULB',
            time: '10:40',
            location: { lat: 50.8137, lng: 4.3843 }
          },
          operator: 'STIB/MIVB',
          duration: 20
        }
      ],
      duration: 40,
      transfers: 1
    }
  ],
  
  // Combined list of all stops for nearby search demo
  allStops: [
    // Train stations
    {
      id: 'BE.NMBS.008812005',
      name: 'Brussels Central',
      location: { lat: 50.845, lng: 4.357 }
    },
    {
      id: 'BE.NMBS.008814001',
      name: 'Brussels South',
      location: { lat: 50.8358, lng: 4.3341 }
    },
    {
      id: 'BE.NMBS.008813003',
      name: 'Brussels North',
      location: { lat: 50.86, lng: 4.361 }
    },
    
    // Bus stops
    {
      id: 'DL:107298',
      name: 'Brussels North Bus Station',
      location: { lat: 50.8598, lng: 4.3608 }
    },
    {
      id: 'MIVB:1452',
      name: 'De Brouckère',
      location: { lat: 50.8505, lng: 4.3536 }
    },
    {
      id: 'MIVB:1234',
      name: 'Brussels Central Bus Stop',
      location: { lat: 50.8452, lng: 4.3566 }
    },
    
    // Metro/Tram stops
    {
      id: 'MIVB:2001',
      name: 'Arts-Loi Metro',
      location: { lat: 50.8476, lng: 4.3661 }
    },
    {
      id: 'MIVB:2002', 
      name: 'Porte de Namur Metro',
      location: { lat: 50.8388, lng: 4.3682 }
    },
    {
      id: 'MIVB:3001',
      name: 'Montgomery Tram',
      location: { lat: 50.8386, lng: 4.4009 }
    }
  ]
};

export default PublicTransportApiService;

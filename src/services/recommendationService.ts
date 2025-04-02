
import { GeoLocation, Route, VehicleCategory } from '@/types/providerApi';
import { CarbonTrackingServiceInterface } from '@/types/carbonTracking';

interface TravelPattern {
  frequentDestinations: {
    location: GeoLocation;
    name: string;
    visitCount: number;
  }[];
  preferredVehicleTypes: {
    category: VehicleCategory;
    useCount: number;
  }[];
  travelTimeDistribution: {
    hourOfDay: number;
    dayOfWeek: number;
    count: number;
  }[];
}

interface UserPreference {
  userId: string;
  prefersCheapest: boolean;
  prefersFastest: boolean;
  prefersEcoFriendly: boolean;
  maxWalkingDistance: number; // in meters
  favoriteProviders: string[];
  savedLocations: {
    name: string;
    type: 'home' | 'work' | 'favorite';
    location: GeoLocation;
  }[];
}

export interface RecommendationServiceInterface {
  // Get personalized route recommendations
  getRecommendedRoutes(
    userId: string,
    startLocation: GeoLocation,
    endLocation: GeoLocation
  ): Promise<Route[]>;
  
  // Get travel pattern analysis
  getUserTravelPatterns(userId: string): Promise<TravelPattern>;
  
  // Learn user preferences based on past choices
  learnUserPreferences(userId: string, selectedRoute: Route, alternativeRoutes: Route[]): Promise<void>;
  
  // Get current user preferences
  getUserPreferences(userId: string): Promise<UserPreference>;
  
  // Update user preferences explicitly
  updateUserPreferences(userId: string, preferences: Partial<UserPreference>): Promise<UserPreference>;
  
  // Get time-based suggestions (e.g., commute time, going home suggestions)
  getTimeSensitiveRecommendations(userId: string): Promise<{
    type: 'commute' | 'return_home' | 'event' | 'regular_trip';
    title: string;
    description: string;
    startLocation: GeoLocation;
    endLocation: GeoLocation;
    suggestedDepartureTime: Date;
    confidence: number; // 0-1, how confident the system is about this recommendation
  }[]>;
  
  // Get recommended nearby points of interest
  getNearbyRecommendations(
    userId: string,
    currentLocation: GeoLocation
  ): Promise<{
    name: string;
    type: 'restaurant' | 'shopping' | 'entertainment' | 'service';
    location: GeoLocation;
    distance: number;
    rating?: number;
    imageUrl?: string;
  }[]>;
}

/**
 * Mock implementation of the recommendation service using
 * simulated data and preferences
 */
class MockRecommendationService implements RecommendationServiceInterface {
  private userPreferences: Map<string, UserPreference> = new Map();
  private userPatterns: Map<string, TravelPattern> = new Map();
  
  // This would be replaced by real ML models or API calls in production
  private simulateRecommendationAlgorithm(
    userId: string,
    startLocation: GeoLocation,
    endLocation: GeoLocation
  ): Route[] {
    // Simplified mock implementation
    const userPref = this.userPreferences.get(userId) || {
      userId,
      prefersCheapest: false,
      prefersFastest: true,
      prefersEcoFriendly: false,
      maxWalkingDistance: 500,
      favoriteProviders: [],
      savedLocations: []
    };
    
    // Generate mockups based on preferences
    const routes: Route[] = [];
    
    // Fast route
    const fastRoute: Route = {
      segments: [{
        startLocation,
        endLocation,
        distance: 5.2,
        duration: 12,
        carbonEmission: 1200,
        price: 12.50,
        currency: 'EUR',
        vehicleCategory: VehicleCategory.TAXI
      }],
      totalDistance: 5.2,
      totalDuration: 12,
      totalCarbonEmission: 1200,
      totalPrice: 12.50,
      currency: 'EUR'
    };
    
    // Eco-friendly route
    const ecoRoute: Route = {
      segments: [
        {
          startLocation,
          endLocation: {
            latitude: startLocation.latitude + 0.01,
            longitude: startLocation.longitude + 0.01
          },
          distance: 1.2,
          duration: 5,
          carbonEmission: 0,
          price: 3.50,
          currency: 'EUR',
          vehicleCategory: VehicleCategory.BIKE
        },
        {
          startLocation: {
            latitude: startLocation.latitude + 0.01,
            longitude: startLocation.longitude + 0.01
          },
          endLocation,
          distance: 4.5,
          duration: 15,
          carbonEmission: 200,
          price: 2.00,
          currency: 'EUR',
          vehicleCategory: VehicleCategory.BUS
        }
      ],
      totalDistance: 5.7,
      totalDuration: 25,
      totalCarbonEmission: 200,
      totalPrice: 5.50,
      currency: 'EUR'
    };
    
    // Budget route
    const budgetRoute: Route = {
      segments: [
        {
          startLocation,
          endLocation: {
            latitude: startLocation.latitude + 0.02,
            longitude: startLocation.longitude + 0.01
          },
          distance: 2.0,
          duration: 25,
          carbonEmission: 0,
          price: 0,
          currency: 'EUR',
          vehicleCategory: VehicleCategory.SCOOTER
        },
        {
          startLocation: {
            latitude: startLocation.latitude + 0.02,
            longitude: startLocation.longitude + 0.01
          },
          endLocation,
          distance: 3.5,
          duration: 12,
          carbonEmission: 200,
          price: 2.00,
          currency: 'EUR',
          vehicleCategory: VehicleCategory.METRO
        }
      ],
      totalDistance: 5.5,
      totalDuration: 37,
      totalCarbonEmission: 200,
      totalPrice: 2.00,
      currency: 'EUR'
    };
    
    // Push routes in preference order
    if (userPref.prefersFastest) {
      routes.push(fastRoute, ecoRoute, budgetRoute);
    } else if (userPref.prefersEcoFriendly) {
      routes.push(ecoRoute, budgetRoute, fastRoute);
    } else if (userPref.prefersCheapest) {
      routes.push(budgetRoute, ecoRoute, fastRoute);
    } else {
      // Default order
      routes.push(fastRoute, ecoRoute, budgetRoute);
    }
    
    return routes;
  }
  
  async getRecommendedRoutes(
    userId: string,
    startLocation: GeoLocation,
    endLocation: GeoLocation
  ): Promise<Route[]> {
    return Promise.resolve(
      this.simulateRecommendationAlgorithm(userId, startLocation, endLocation)
    );
  }
  
  async getUserTravelPatterns(userId: string): Promise<TravelPattern> {
    if (!this.userPatterns.has(userId)) {
      // Create mock travel patterns
      this.userPatterns.set(userId, {
        frequentDestinations: [
          {
            location: { latitude: 50.8505, longitude: 4.3488 },
            name: "Brussels Central",
            visitCount: 23
          },
          {
            location: { latitude: 50.8467, longitude: 4.3532 },
            name: "Grand Place",
            visitCount: 15
          }
        ],
        preferredVehicleTypes: [
          { category: VehicleCategory.TAXI, useCount: 18 },
          { category: VehicleCategory.BUS, useCount: 12 },
          { category: VehicleCategory.BIKE, useCount: 7 }
        ],
        travelTimeDistribution: [
          { hourOfDay: 8, dayOfWeek: 1, count: 5 },
          { hourOfDay: 17, dayOfWeek: 1, count: 5 },
          { hourOfDay: 8, dayOfWeek: 2, count: 4 },
          { hourOfDay: 17, dayOfWeek: 2, count: 4 }
        ]
      });
    }
    
    return Promise.resolve(this.userPatterns.get(userId)!);
  }
  
  async learnUserPreferences(
    userId: string,
    selectedRoute: Route,
    alternativeRoutes: Route[]
  ): Promise<void> {
    const currentPrefs = this.userPreferences.get(userId) || {
      userId,
      prefersCheapest: false,
      prefersFastest: false,
      prefersEcoFriendly: false,
      maxWalkingDistance: 500,
      favoriteProviders: [],
      savedLocations: []
    };
    
    // Simple learning logic based on selected route vs alternatives
    if (selectedRoute.totalDuration <= Math.min(...alternativeRoutes.map(r => r.totalDuration))) {
      currentPrefs.prefersFastest = true;
    }
    
    if (selectedRoute.totalPrice <= Math.min(...alternativeRoutes.map(r => r.totalPrice))) {
      currentPrefs.prefersCheapest = true;
    }
    
    if (selectedRoute.totalCarbonEmission <= Math.min(...alternativeRoutes.map(r => r.totalCarbonEmission))) {
      currentPrefs.prefersEcoFriendly = true;
    }
    
    this.userPreferences.set(userId, currentPrefs);
    return Promise.resolve();
  }
  
  async getUserPreferences(userId: string): Promise<UserPreference> {
    if (!this.userPreferences.has(userId)) {
      this.userPreferences.set(userId, {
        userId,
        prefersCheapest: false,
        prefersFastest: true,
        prefersEcoFriendly: false,
        maxWalkingDistance: 500,
        favoriteProviders: [],
        savedLocations: []
      });
    }
    
    return Promise.resolve(this.userPreferences.get(userId)!);
  }
  
  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreference>
  ): Promise<UserPreference> {
    const currentPrefs = await this.getUserPreferences(userId);
    const updatedPrefs = { ...currentPrefs, ...preferences };
    this.userPreferences.set(userId, updatedPrefs);
    return Promise.resolve(updatedPrefs);
  }
  
  async getTimeSensitiveRecommendations(userId: string): Promise<{
    type: 'commute' | 'return_home' | 'event' | 'regular_trip';
    title: string;
    description: string;
    startLocation: GeoLocation;
    endLocation: GeoLocation;
    suggestedDepartureTime: Date;
    confidence: number;
  }[]> {
    // Mock time-sensitive recommendations
    const now = new Date();
    const hour = now.getHours();
    const recommendations = [];
    
    // Morning commute suggestion
    if (hour >= 7 && hour <= 9) {
      recommendations.push({
        type: 'commute',
        title: 'Morning Commute',
        description: 'Your usual route to work',
        startLocation: { latitude: 50.8467, longitude: 4.3532 }, // Example home
        endLocation: { latitude: 50.8505, longitude: 4.3488 },   // Example work
        suggestedDepartureTime: now,
        confidence: 0.85
      });
    }
    
    // Evening return home suggestion
    if (hour >= 17 && hour <= 19) {
      recommendations.push({
        type: 'return_home',
        title: 'Head Home',
        description: 'Quick route back home',
        startLocation: { latitude: 50.8505, longitude: 4.3488 },  // Example work
        endLocation: { latitude: 50.8467, longitude: 4.3532 },    // Example home
        suggestedDepartureTime: now,
        confidence: 0.9
      });
    }
    
    return Promise.resolve(recommendations);
  }
  
  async getNearbyRecommendations(
    userId: string,
    currentLocation: GeoLocation
  ): Promise<{
    name: string;
    type: 'restaurant' | 'shopping' | 'entertainment' | 'service';
    location: GeoLocation;
    distance: number;
    rating?: number;
    imageUrl?: string;
  }[]> {
    // Mock nearby recommendations
    return Promise.resolve([
      {
        name: 'Bistro Central',
        type: 'restaurant',
        location: {
          latitude: currentLocation.latitude + 0.001,
          longitude: currentLocation.longitude + 0.002
        },
        distance: 0.3,
        rating: 4.5,
        imageUrl: 'https://picsum.photos/200/100'
      },
      {
        name: 'City Shopping Mall',
        type: 'shopping',
        location: {
          latitude: currentLocation.latitude - 0.002,
          longitude: currentLocation.longitude + 0.001
        },
        distance: 0.5,
        rating: 4.2,
        imageUrl: 'https://picsum.photos/200/100'
      },
      {
        name: 'Grand Cinema',
        type: 'entertainment',
        location: {
          latitude: currentLocation.latitude + 0.003,
          longitude: currentLocation.longitude - 0.001
        },
        distance: 0.7,
        rating: 4.8,
        imageUrl: 'https://picsum.photos/200/100'
      }
    ]);
  }
}

// Exporting the service
export const recommendationService: RecommendationServiceInterface = new MockRecommendationService();

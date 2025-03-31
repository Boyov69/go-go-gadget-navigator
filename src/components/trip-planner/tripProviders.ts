
export interface TripProvider {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  eta: string;
  recommended?: boolean;
}

// Sample providers for price comparison
export const tripProviders: TripProvider[] = [
  {
    id: "provider1",
    name: "Express Transfer",
    price: 12.50,
    rating: 4.5,
    features: ["24/7 Support", "No hidden fees", "Free cancellation", "Live tracking"],
    eta: "5 min",
    recommended: true
  },
  {
    id: "provider2",
    name: "City Rides",
    price: 10.75,
    rating: 4.2,
    features: ["Fixed price", "Professional drivers", "Payment options", "Free waiting time"],
    eta: "7 min"
  },
  {
    id: "provider3",
    name: "Premium Cars",
    price: 18.00,
    rating: 4.8,
    features: ["Premium vehicles", "Wi-Fi onboard", "Refreshments", "Meet & greet"],
    eta: "10 min"
  }
];

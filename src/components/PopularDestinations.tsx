
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Star } from "lucide-react";

const PopularDestinations: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Amsterdam",
      country: "Netherlands",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      color: "bg-teal-100"
    },
    {
      id: 2,
      name: "Paris",
      country: "France",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      color: "bg-blue-100"
    },
    {
      id: 3,
      name: "Barcelona",
      country: "Spain",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      color: "bg-teal-100"
    },
    {
      id: 4,
      name: "Tokyo",
      country: "Japan",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      color: "bg-blue-100"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Popular Destinations</h2>
        </div>
        <a href="#" className="text-sm text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((destination) => (
          <Card key={destination.id} className={`overflow-hidden transition-all duration-300 destination-card border ${destination.color}`}>
            <div className="relative h-40">
              <img
                src={destination.image}
                alt={destination.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{destination.rating}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{destination.name}</h3>
              <p className="text-sm text-muted-foreground">{destination.country}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;

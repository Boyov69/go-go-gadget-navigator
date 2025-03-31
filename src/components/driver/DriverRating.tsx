
import React from "react";
import { Star, User, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DriverReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar?: string;
}

interface DriverRatingProps {
  driverName: string;
  driverRating: number; 
  totalReviews: number;
  driverPhoto?: string;
  reviews: DriverReview[];
}

const DriverRating: React.FC<DriverRatingProps> = ({
  driverName,
  driverRating,
  totalReviews,
  driverPhoto,
  reviews
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Driver Rating</h3>
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(driverRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="ml-2 font-bold">{driverRating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4 pb-4 border-b">
          <Avatar className="h-16 w-16 mr-4">
            {driverPhoto ? (
              <AvatarImage src={driverPhoto} alt={driverName} />
            ) : (
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h4 className="font-medium text-lg">{driverName}</h4>
            <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
          </div>
        </div>
        
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {reviews.map(review => (
            <div key={review.id} className="pb-3 border-b last:border-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    {review.userAvatar ? (
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                    ) : (
                      <AvatarFallback>
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="font-medium">{review.userName}</span>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm mt-2">{review.comment}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{review.date}</span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">Helpful</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverRating;

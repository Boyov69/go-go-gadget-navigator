
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPreference, recommendationService } from '@/services/recommendationService';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const RecommendationPreferencesTab: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  
  const [preferences, setPreferences] = useState<Partial<UserPreference>>({
    prefersCheapest: false,
    prefersFastest: true,
    prefersEcoFriendly: false,
    maxWalkingDistance: 500
  });
  
  const { data: userPreferences, isLoading } = useQuery({
    queryKey: ['user-preferences', userId],
    queryFn: () => recommendationService.getUserPreferences(userId),
    enabled: !!userId,
    meta: {
      onSuccess: (data) => {
        setPreferences(data);
      }
    }
  });
  
  const updatePreferencesMutation = useMutation({
    mutationFn: (newPreferences: Partial<UserPreference>) => 
      recommendationService.updateUserPreferences(userId, newPreferences),
    onSuccess: () => {
      toast({
        title: "Preferences updated",
        description: "Your recommendation preferences have been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update preferences",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
  const handleSavePreferences = () => {
    updatePreferencesMutation.mutate(preferences);
  };
  
  const handleToggleChange = (key: keyof UserPreference, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSliderChange = (value: number[]) => {
    setPreferences(prev => ({ ...prev, maxWalkingDistance: value[0] }));
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommendation Preferences</CardTitle>
          <CardDescription>Loading your preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendation Preferences</CardTitle>
        <CardDescription>Customize how we suggest routes and transportation options for you</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Route Preferences</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="prefer-fastest" className="flex flex-col">
                  <span>Prefer Fastest Routes</span>
                  <span className="text-xs text-muted-foreground">Prioritize saving time</span>
                </Label>
                <Switch 
                  id="prefer-fastest" 
                  checked={preferences.prefersFastest} 
                  onCheckedChange={(checked) => handleToggleChange('prefersFastest', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="prefer-cheapest" className="flex flex-col">
                  <span>Prefer Cheapest Routes</span>
                  <span className="text-xs text-muted-foreground">Prioritize saving money</span>
                </Label>
                <Switch 
                  id="prefer-cheapest" 
                  checked={preferences.prefersCheapest} 
                  onCheckedChange={(checked) => handleToggleChange('prefersCheapest', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="prefer-eco" className="flex flex-col">
                  <span>Prefer Eco-Friendly Routes</span>
                  <span className="text-xs text-muted-foreground">Prioritize reducing carbon footprint</span>
                </Label>
                <Switch 
                  id="prefer-eco" 
                  checked={preferences.prefersEcoFriendly} 
                  onCheckedChange={(checked) => handleToggleChange('prefersEcoFriendly', checked)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Walking Preferences</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="max-walking-distance">Maximum Walking Distance</Label>
                  <span className="text-sm">{preferences.maxWalkingDistance}m</span>
                </div>
                <Slider
                  id="max-walking-distance"
                  defaultValue={[preferences.maxWalkingDistance || 500]}
                  max={2000}
                  min={100}
                  step={100}
                  onValueChange={handleSliderChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum distance you're willing to walk between transit stops or to your destination
                </p>
              </div>
            </div>
            
            <Button onClick={handleSavePreferences} className="w-full" disabled={updatePreferencesMutation.isPending}>
              {updatePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecommendationPreferencesTab;

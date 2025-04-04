
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Navigation, MapPin, Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AIFeatureShowcase: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Voice Navigation",
      description: "Control your journey with natural voice commands",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Smart Routing",
      description: "AI-optimized routes based on real-time conditions",
      icon: Navigation,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "AI Recommendations",
      description: "Personalized suggestions based on your preferences",
      icon: Brain,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Location Intelligence",
      description: "Context-aware assistance for your surroundings",
      icon: MapPin,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    }
  ];

  return (
    <section className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            AI-Powered Experience
            <Badge variant="default" className="ml-2 bg-primary/20 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          </h2>
          <p className="text-muted-foreground">
            Discover how our advanced AI enhances your travel experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`p-2 rounded-md w-10 h-10 flex items-center justify-center ${feature.bgColor}`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Bot className="h-5 w-5 mr-2" /> Meet Your AI Assistant
          </CardTitle>
          <CardDescription className="text-white/80">
            Your personal navigator with voice control and smart recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Experience hands-free navigation, real-time traffic updates, and personalized recommendations - all powered by advanced artificial intelligence.</p>
          <ul className="list-disc ml-5 mt-4 space-y-1 text-sm">
            <li>Voice commands for safer, hands-free control</li>
            <li>Contextual awareness of your location and preferences</li>
            <li>Predictive suggestions based on your travel patterns</li>
            <li>Real-time updates and intelligent rerouting</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            variant="secondary" 
            className="mt-2 bg-white text-blue-600 hover:bg-white/90"
            onClick={() => navigate("/navigate")}
          >
            Try Voice Navigation
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AIFeatureShowcase;

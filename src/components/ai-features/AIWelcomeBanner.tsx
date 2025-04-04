
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';
import { motion } from 'framer-motion';

const AIWelcomeBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    // Check if we've shown this banner before
    const hasSeenBanner = localStorage.getItem('hasSeenAIWelcome');
    if (!hasSeenBanner) {
      // Wait a moment before showing the banner
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Generate appropriate greeting based on time of day
    const hour = new Date().getHours();
    let timeBasedGreeting = '';
    
    if (hour < 12) {
      timeBasedGreeting = 'Good morning';
    } else if (hour < 17) {
      timeBasedGreeting = 'Good afternoon';
    } else {
      timeBasedGreeting = 'Good evening';
    }
    
    // Randomly select a greeting
    const greetings = [
      `${timeBasedGreeting}! I'm your AI assistant. Ask me for directions or local information.`,
      `${timeBasedGreeting}! Need help navigating? Try asking me with voice commands.`,
      `${timeBasedGreeting}! I can help you find the fastest route or nearby services.`,
    ];
    
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  const dismissBanner = () => {
    setVisible(false);
    localStorage.setItem('hasSeenAIWelcome', 'true');
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-900">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="bg-primary rounded-full p-2 mt-1">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium">{greeting}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Press Alt+A anytime to activate voice controls
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={dismissBanner} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIWelcomeBanner;

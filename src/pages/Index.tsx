
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import QuickTools from "@/components/QuickTools";
import EmergencyButton from "@/components/EmergencyButton";
import LanguageSelector from "@/components/LanguageSelector";
import UserLoginSection from "@/components/dashboard/UserLoginSection";
import LeftSidebar from "@/components/dashboard/LeftSidebar";
import MainContent from "@/components/dashboard/MainContent";
import RightSidebar from "@/components/dashboard/RightSidebar";
import AIAssistant from "@/components/ai-assistant/AIAssistant";
import AIFeatureShowcase from "@/components/ai-features/AIFeatureShowcase";
import AIWelcomeBanner from "@/components/ai-features/AIWelcomeBanner";
import AIModeTutorial from "@/components/ai-features/AIModeTutorial";
import { useNavigationMode } from "@/contexts/NavigationModeContext";

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mode } = useNavigationMode();
  const [showAITutorial, setShowAITutorial] = useState(false);
  
  // Show AI tutorial when switching to AI mode for the first time
  useEffect(() => {
    if (mode === 'ai') {
      // Check if the user has seen the tutorial before
      const hasSeenTutorial = localStorage.getItem('hasSeenAITutorial');
      if (!hasSeenTutorial) {
        setShowAITutorial(true);
        localStorage.setItem('hasSeenAITutorial', 'true');
      }
    }
  }, [mode]);
  
  // Sample driver reviews
  const driverReviews = [
    {
      id: "rev1",
      userName: "Jane Cooper",
      rating: 5,
      comment: "Really professional driver, car was clean and trip was smooth.",
      date: "Oct 10, 2023"
    },
    {
      id: "rev2",
      userName: "Alex Morgan",
      rating: 4,
      comment: "Good service, arrived on time. Would use again.",
      date: "Sep 5, 2023"
    },
    {
      id: "rev3",
      userName: "Sam Wilson",
      rating: 5,
      comment: "Outstanding service! The driver was very helpful with my luggage.",
      date: "Aug 22, 2023"
    }
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {mode === 'manual' && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}>
          <LanguageSelector />
        </Navbar>
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8 pb-20 md:pb-6">
          {/* AI Welcome Banner */}
          <AIWelcomeBanner />
          
          {/* AI Mode Tutorial */}
          {mode === 'ai' && showAITutorial && (
            <AIModeTutorial onClose={() => setShowAITutorial(false)} />
          )}
          
          {/* Quick Tools at the top - more visible */}
          <div className="mb-6">
            <QuickTools />
          </div>

          {/* User Login/Info Section */}
          <UserLoginSection />

          {/* AI Feature Showcase */}
          <div className="mb-6">
            <AIFeatureShowcase />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-3">
              <LeftSidebar />
            </div>
            
            {/* Center column with map - largest component */}
            <div className="lg:col-span-6">
              <MainContent driverReviews={driverReviews} />
            </div>
            
            {/* Right column */}
            <div className="lg:col-span-3">
              <RightSidebar />
            </div>
          </div>
        </main>
        
        <EmergencyButton />
        <AIAssistant />
      </div>
    </div>
  );
};

export default Index;

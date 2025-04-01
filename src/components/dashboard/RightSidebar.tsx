
import React from "react";
import PlanTripCard from "@/components/PlanTripCard";
import RideBooking from "@/components/RideBooking";
import RoadAssistanceService from "@/components/RoadAssistanceService";

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <RoadAssistanceService />
      <PlanTripCard />
      <RideBooking />
    </div>
  );
};

export default RightSidebar;

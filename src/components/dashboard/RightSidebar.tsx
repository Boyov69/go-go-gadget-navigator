
import React from "react";
import PlanTripCard from "@/components/PlanTripCard";
import RideBooking from "@/components/RideBooking";

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <PlanTripCard />
      <RideBooking />
    </div>
  );
};

export default RightSidebar;

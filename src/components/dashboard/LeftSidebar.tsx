
import React from "react";
import SavedAddresses from "@/components/SavedAddresses";
import RideHistory from "@/components/RideHistory";
import GlobalCoverage from "@/components/GlobalCoverage";

const LeftSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <SavedAddresses />
      <RideHistory />
      <GlobalCoverage />
    </div>
  );
};

export default LeftSidebar;

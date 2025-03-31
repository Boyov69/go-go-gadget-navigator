
import React from "react";
import MapExplorer from "./MapExplorer";
import LocalTransportInfo from "@/components/LocalTransportInfo";
import DriverRating from "@/components/driver/DriverRating";

interface MainContentProps {
  driverReviews: any[];
}

const MainContent: React.FC<MainContentProps> = ({ driverReviews }) => {
  return (
    <div className="space-y-6">
      <MapExplorer />
      <LocalTransportInfo />
      <DriverRating
        driverName="Michael Johnson"
        driverRating={4.8}
        totalReviews={124}
        reviews={driverReviews}
      />
    </div>
  );
};

export default MainContent;

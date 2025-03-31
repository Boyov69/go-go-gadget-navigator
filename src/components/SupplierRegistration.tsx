
import React from "react";
import SupplierRegistrationForm from "@/components/supplier/SupplierRegistrationForm";
import SupplierBenefits from "@/components/supplier/SupplierBenefits";
import SupplierRequirements from "@/components/supplier/SupplierRequirements";

interface SupplierRegistrationProps {
  onRegistered: () => void;
}

const SupplierRegistration: React.FC<SupplierRegistrationProps> = ({ onRegistered }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SupplierRegistrationForm onSubmitSuccess={onRegistered} />
      
      <div className="space-y-6">
        <SupplierBenefits />
        <SupplierRequirements />
      </div>
    </div>
  );
};

export default SupplierRegistration;

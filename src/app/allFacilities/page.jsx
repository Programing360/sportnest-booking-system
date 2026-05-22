import FeatureCard from "@/component/FeatureCard";
import SearchFacilities from "@/component/SearchFacilities";
import { allFeatureData } from "@/lib/data";
import { Label, SearchField } from "@heroui/react";
import React from "react";

const FacilitiesPage = async () => {
  const featureData = await allFeatureData();
  return (
    <div className="  dark:bg-slate-800 dark:text-white">
      <div className="container mx-auto py-10 ">
        
        <SearchFacilities featureData={featureData}></SearchFacilities>
      </div>
    </div>
  );
};

export default FacilitiesPage;

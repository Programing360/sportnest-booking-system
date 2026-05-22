import React from "react";
import ManageFacilities from "@/component/ManageFacilities";
import { allFeatureData } from "@/lib/data";

const ManageFacilitiesPage = async () => {

    const allFacilitiesData = await allFeatureData()

  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <ManageFacilities ownerFacilities={allFacilitiesData}></ManageFacilities>
    </div>
  );
};

export default ManageFacilitiesPage;

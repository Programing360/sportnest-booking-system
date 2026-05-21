import React from "react";
import ManageFacilities from "@/component/ManageFacilities";
import { allFeatureData } from "@/lib/data";

const ManageFacilitiesPage = async () => {

    const allFacilitiesData = await allFeatureData()

  return (
    <div>
      <ManageFacilities ownerFacilities={allFacilitiesData}></ManageFacilities>
    </div>
  );
};

export default ManageFacilitiesPage;

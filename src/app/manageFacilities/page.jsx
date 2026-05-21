import React from "react";
import ManageFacilities from "@/component/ManageFacilities";
import { allFeatureData } from "@/lib/data";

// ধরে নিচ্ছি এই ফাংশনটি আপনার data.js বা অ্যাকশন ফাইলে আছে

const ManageFacilitiesPage = async () => {

    const allFacilitiesData = await allFeatureData()

  return (
    <div>
      <ManageFacilities ownerFacilities={allFacilitiesData}></ManageFacilities>
    </div>
  );
};

export default ManageFacilitiesPage;

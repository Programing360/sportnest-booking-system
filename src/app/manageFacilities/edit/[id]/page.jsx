import EditFacilityForm from "@/component/EditFacilityForm";
import { allFeatureData } from "@/lib/data";
import React from "react";

const EditFacilityPage = async ({ params }) => {
  const { id } = await params;
  const facilityData = await allFeatureData(id);
  const filterFacilities = facilityData.filter((item) => item._id === id);
  if (!facilityData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Facility Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="dark:bg-neutral-900">
      {filterFacilities.map((item) => (
        <EditFacilityForm key={item._id} facilityData={item} id={id} />
      ))}
    </div>
  );
};

export default EditFacilityPage;

import EditFacilityForm from "@/component/EditFacilityForm";
import { allFeatureData } from "@/lib/data";
import React from "react";

// async function getSingleFacility(id) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/facilities/${id}`,
//     {
//       cache: "no-store",
//     },
//   );
//   if (!res.ok) return null;
//   return res.json();
// }

const EditFacilityPage = async ({ params }) => {
  const { id } = await params;
  const facilityData = await allFeatureData(id);
const filterFacilities = facilityData.filter(item => item._id === id)
  if (!facilityData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Facility Not Found!</h2>
      </div>
    );
  }

  return (
    <div>
        {filterFacilities.map(item => <EditFacilityForm key={item._id} facilityData={item} id={id} />)}
    </div>
  );
};

export default EditFacilityPage;

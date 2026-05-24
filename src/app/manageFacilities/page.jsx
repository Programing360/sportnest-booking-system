import React from "react";
import ManageFacilities from "@/component/ManageFacilities";
import { allFeatureData, ownerFacilitiesData } from "@/lib/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ManageFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const ownerFacilities = await ownerFacilitiesData(userId);
  console.log(ownerFacilities);


  // const allFacilitiesData = await allFeatureData();

  return (
    <div className="dark:bg-slate-800 dark:text-white min-h-screen">
      <ManageFacilities ownerFacilities={ownerFacilities}></ManageFacilities>
    </div>
  );
};

export default ManageFacilitiesPage;

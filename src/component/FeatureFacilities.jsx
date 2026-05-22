import { allFeatureData } from "@/lib/data";
import { Button } from "@heroui/react";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import FacilitiesCard from "./FacilitiesCard";

const FeatureFacilities = async () => {
  const featureData = await allFeatureData();

  return (
    <div className="px-4 md:px-6 dark:bg-slate-800 pb-10">
      {/* Top Header Section */}
      <div className="container mx-auto dark:text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ">
          <div className="pt-12">
            <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white">
              Featured Facilities
            </h1>

            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Discover and book the best sports venues near you.
            </p>
          </div>
          <Link href={"/allFacilities"}>
            <Button className="bg-[#163962] text-white hover:scale-105 transition-all duration-200 active:scale-95 font-medium rounded-full shadow-sm text-sm">
              All Features <FaArrowRight />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureData.slice(0, 6).map((feature) => (
            <FacilitiesCard
              key={feature._id}
              facilities={feature}
            ></FacilitiesCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureFacilities;

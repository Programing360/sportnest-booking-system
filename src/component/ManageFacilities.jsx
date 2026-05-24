"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Edit3,
  Trash2,
  MapPin,
  AlertTriangle,
  Plus,
  ImageOff,
} from "lucide-react";
import { toast } from "react-toastify";
import { deleteFaclities } from "@/lib/data";

const ManageFacilities = ({ ownerFacilities = [] }) => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

//  console.log(ownerFacilities);


  const handleOpenDeleteModal = (facility) => {
    setSelectedFacility(facility);
   
  
    document.getElementById("delete_confirmation_modal").showModal();
  };


  const handleCloseModal = () => {
    document.getElementById("delete_confirmation_modal").close();
  };


  const handleConfirmDelete = async (id) => {
  
    if (!selectedFacility?._id) return;

    setIsDeleting(false);

    try {
      const res = await deleteFaclities(selectedFacility?._id);

      if (res?.success || res?.deletedCount > 0) {
        toast.success(`🎯 "${selectedFacility.name}" has been deleted.`);
        handleCloseModal();
        window.location.reload();
      } else {
        toast.error("Failed to delete the facility.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 antialiased ">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight dark:text-white">
              Manage My Facilities
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-medium mt-1 ">
              Exclusive Owner Access: Update details or manage slots of your
              registered arenas.
            </p>
          </div>

       
          <Link href="/addFacility" className="w-full sm:w-auto">
            <button className="btn btn-md bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-5 h-12 rounded-2xl border-none shadow-lg shadow-purple-600/10 flex items-center gap-2 w-full justify-center active:scale-95 transition-transform">
              <Plus size={16} />
              <span>Add New Facility</span>
            </button>
          </Link>
        </div>

        
        {ownerFacilities.length > 0 ? (
          <div className="overflow-x-auto border border-gray-100 rounded-[2rem] bg-white shadow-sm">
            <table className="table w-full text-left border-collapse">
             
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="font-bold text-gray-500 text-xs uppercase tracking-wider py-4 pl-6">
                    Facility Details
                  </th>
                  <th className="font-bold text-gray-500 text-xs uppercase tracking-wider py-4">
                    Type
                  </th>
                  <th className="font-bold text-gray-500 text-xs uppercase tracking-wider py-4">
                    Price / Hr
                  </th>
                  <th className="font-bold text-gray-500 text-xs uppercase tracking-wider py-4 text-center pr-6">
                    Actions
                  </th>
                </tr>
              </thead>

        
              <tbody>
                {ownerFacilities.map((facility) => {
                  const isValidImage =
                    typeof facility?.image === "string" &&
                    facility.image.trim() !== "";

                  return (
                    <tr
                      key={facility._id}
                      className="border-b border-gray-50 hover:bg-purple-50/[0.02] transition-colors"
                    >
                     
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                            {isValidImage ? (
                              <Image
                                src={facility.image}
                                alt={facility.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                <ImageOff size={16} />
                              </div>
                            )}
                          </div>
                          <div className="truncate max-w-[180px] md:max-w-xs">
                            <p className="font-bold text-gray-900 truncate text-sm md:text-base">
                              {facility.name}
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5 truncate">
                              <MapPin
                                size={12}
                                className="text-rose-500 shrink-0"
                              />
                              <span className="truncate">
                                {facility.location || "Main Center"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      
                      <td className="py-4">
                        <span className="badge py-3 bg-purple-50 text-purple-700 border border-purple-100/50 font-bold text-[10px] uppercase tracking-wide rounded-xl">
                          {facility.sportType || "General"}
                        </span>
                      </td>

                    
                      <td className="py-4 font-mono font-bold text-gray-900 text-sm md:text-base">
                        ${facility.pricePerHour || 0}
                      </td>

                   
                      <td className="py-4 text-center pr-6">
                        <div className="flex items-center justify-center gap-2">
                        
                          <div
                            className="tooltip font-bold text-xs"
                            data-tip="Edit Facility"
                          >
                            <Link
                              href={`/manageFacilities/edit/${facility._id}`}
                            >
                              <button className="btn btn-sm btn-square bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-xl">
                                <Edit3 size={15} />
                              </button>
                            </Link>
                          </div>

                         
                          <div
                            className="tooltip font-bold text-xs tooltip-error"
                            data-tip="Delete Facility"
                          >
                            <button
                              onClick={() => handleOpenDeleteModal(facility)}
                              className="btn btn-sm btn-square bg-rose-50 text-rose-600 hover:bg-rose-100 border-none rounded-xl"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
      
          <div className="text-center py-16 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200 max-w-md mx-auto px-6">
            <p className="text-gray-400 font-bold text-lg mb-1">
              No Facilities Registered
            </p>
            <p className="text-gray-400 text-xs font-medium">
              You haven't listed any court or arena yet.
            </p>
          </div>
        )}

   
        <dialog
          id="delete_confirmation_modal"
          className="modal modal-bottom sm:modal-middle backdrop-blur-md"
        >
          <div className="modal-box bg-white max-w-md rounded-[2.5rem] border border-gray-100 shadow-2xl p-6">
    
            <div className="flex items-center gap-3 text-gray-900 font-black text-xl tracking-tight mb-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100/50 shrink-0">
                <AlertTriangle size={20} className="stroke-[2.5]" />
              </div>
              <span>Confirm Deletion</span>
            </div>

            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Are you absolutely sure you want to permanently delete{" "}
              <strong className="text-gray-900 font-bold">
                {selectedFacility?.name}
              </strong>
              ? This action cannot be undone and all associated bookings will be
              automatically dropped.
            </p>

            <div className="modal-action gap-2 mt-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="btn bg-gray-100 hover:bg-gray-200 text-gray-600 border-none rounded-xl text-xs font-bold uppercase tracking-wider px-5 h-11 min-h-0"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleConfirmDelete(selectedFacility?._id)}
                className={`btn bg-rose-600 hover:bg-rose-700 text-white border-none rounded-xl text-xs font-bold uppercase tracking-wider px-5 h-11 min-h-0 shadow-md shadow-rose-200`}
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseModal}>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ManageFacilities;

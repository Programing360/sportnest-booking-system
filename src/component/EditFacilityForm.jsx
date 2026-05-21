"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Building,
  MapPin,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { updateFacilities } from "@/lib/data";

const EditFacilityForm = ({ facilityData, id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sportType: facilityData?.sportType || "",
    name: facilityData?.name || "",
    location: facilityData?.location || "",
    pricePerHour: facilityData?.pricePerHour || "",
    image: facilityData?.image || "",
    description: facilityData?.description || "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerHour" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.sportType || !formData.pricePerHour) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateFacilities(formData, id);
    
      if (res.modifiedCount > 0){
        toast.success("🎯 Facility updated successfully!");

        router.push("/manageFacilities");
        router.refresh();
      } else {
        toast.info("No changes were modified.");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 antialiased">
      <div className="mb-8">
        <Link href="/manageFacilities">
          <button className="btn btn-sm bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/60 rounded-xl gap-2 font-bold normal-case mb-4 shadow-sm">
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles size={24} className="text-purple-600" />
            <span>Edit Facility Details</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">
            Modifying parameters for ID:
            <span className="font-mono text-purple-600 font-bold">{id}</span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
                Facility Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Building size={16} className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-11 bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm h-12 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
                Sport Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="sportType"
                value={formData.sportType}
                onChange={handleChange}
                className="select select-bordered w-full bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm h-12 transition-all outline-none"
                required
              >
                <option value="" disabled>
                  Select Sport Category
                </option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Gymnasium">Gymnasium</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
                Location/Venue
              </label>
              <div className="relative flex items-center">
                <MapPin size={16} className="absolute left-4 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-11 bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm h-12 transition-all outline-none"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
                Price Per Hour ($) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex items-center">
                <DollarSign
                  size={16}
                  className="absolute left-4 text-gray-400"
                />
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-11 bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm h-12 transition-all outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
              Facility Image URL
            </label>
            <div className="relative flex items-center">
              <ImageIcon size={16} className="absolute left-4 text-gray-400" />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full pl-11 bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm h-12 transition-all outline-none"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs text-gray-500 uppercase tracking-wider pb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full p-4 bg-gray-50/70 focus:border-purple-500 focus:bg-white rounded-2xl font-semibold text-gray-800 text-sm transition-all resize-none outline-none leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-gray-50 flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className="btn bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-6 h-12 rounded-2xl border-none shadow-lg shadow-purple-600/10 flex items-center gap-2 active:scale-95 transition-transform"
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Save size={16} />
              )}
              <span>Update Facility</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFacilityForm;

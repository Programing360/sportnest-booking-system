"use client";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Check, ArrowLeftRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { AddFacilityFeature } from "@/lib/data";

const AddFacility = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.target);
    const facilitiesData = Object.fromEntries(data.entries());

    const allFeatureInfo = {
      ownerEmail: user?.email,
      name: facilitiesData.name,
      sportType: facilitiesData.facilityType, 
      image: facilitiesData.url,
      location: facilitiesData.location,
      pricePerHour: Number(facilitiesData.price),
      capacity: Number(facilitiesData.capacity),
      description: facilitiesData.description,
      availabilityStatus: "Available",
      timeSlots: facilitiesData.timeSlots,
      createAt: new Date(),
    };

    try {
      const res = await AddFacilityFeature(allFeatureInfo);
      if (res?.insertedId) {
        toast.success("Facility Added Successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to Add Facility!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* --- ১. ব্রেডক্রাম্ব এবং হেডার সেকশন --- */}
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <span>Dashboard</span>
            <FaChevronRight className="text-[9px]" />
            <span className="text-orange-500 dark:text-orange-400 font-extrabold">Add Facility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Create New Sports Facility
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Fill up the accurate details to list a new arena, stadium or court on SportNest network.
          </p>
        </div>

        {/* --- ২. মেইন প্রিমিয়াম ফর্ম কার্ড --- */}
        <form 
          onSubmit={handleSubmitForm} 
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-8 transition-all"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* কলাম ১: লেফট সাইড ইনপুটস */}
            <div className="space-y-5">
              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Facility Name</label>
                <input 
                  required 
                  name="name" 
                  type="text" 
                  placeholder="e.g. Old Trafford Arena" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Facility Type / Sport</label>
                <input 
                  required 
                  name="facilityType" 
                  type="text" 
                  placeholder="e.g. Football, Tennis Court" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Image URL</label>
                <input 
                  required 
                  name="url" 
                  type="url" 
                  placeholder="Paste direct link (ImgBB / PostImage)" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Location</label>
                <input 
                  required 
                  name="location" 
                  type="text" 
                  placeholder="e.g. Sector 10, Uttara, Dhaka" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            {/* কলাম ২: রাইট সাইড ইনপুটস */}
            <div className="space-y-5">
              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Price Per Hour ($ / ৳)</label>
                <input 
                  required 
                  name="price" 
                  type="number" 
                  placeholder="Enter hourly rate" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Maximum Capacity</label>
                <input 
                  required 
                  name="capacity" 
                  type="number" 
                  placeholder="e.g. 22 players" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Available Time Slots</label>
                <input 
                  required 
                  name="timeSlots" 
                  type="text" 
                  placeholder="e.g. 6am - 12pm, 4pm - 10pm" 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label font-bold text-sm text-slate-700 dark:text-slate-300">Description</label>
                <input 
                  required 
                  name="description" 
                  type="text" 
                  placeholder="Briefly describe facilities, lighting conditions..." 
                  className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

          </div>

          {/* --- ৩. অ্যাকশন বাটন গ্রুপ (সাবমিট ও রিসেট) --- */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-6 mt-2">
            <button 
              disabled={loading}
              type="submit" 
              className="btn btn-md w-full sm:w-auto sm:flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 border-none text-white font-bold rounded-xl shadow-lg shadow-orange-500/10 active:scale-98 transition-all gap-2 uppercase tracking-wide text-xs"
            >
              {loading ? <span className="loading loading-spinner loading-xs"></span> : <Check size={16} className="stroke-[2.5]" />}
              <span>{loading ? "Submitting..." : "Submit Facility"}</span>
            </button>
            
            <button 
              type="reset" 
              className="btn btn-md btn-outline w-full sm:w-auto sm:flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl active:scale-98 transition-all gap-2 uppercase tracking-wide text-xs"
            >
              <ArrowLeftRight size={15} />
              <span>Reset Details</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFacility;
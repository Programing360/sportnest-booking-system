"use client";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities, myBookingFacilities } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MapPin,
  DollarSign,
  Activity,
  CalendarDays,
  ImageOff,
  ArrowRight
} from "lucide-react";

const FacilitiesCard = ({ facilities }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState("");
  const { _id, name, image, description, pricePerHour, sportType, location } =
    facilities || {};

  const isValidImage = typeof image === "string" && image.trim() !== "";

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleBooking = async (feature) => {
    if (!user?.id) {
      toast.error("Please login again to book.");
      return;
    }
    setLoading(true);

    try {
      const myBooking = await myBookingFacilities(user.id);
      const matchBooking = myBooking?.find(
        (item) => item.facility_id === feature._id
      );

      if (matchBooking) {
        toast.warn("You already added this facility.");
        return;
      }

      const bookingInfo = {
        facility_id: _id,
        userId: user?.id,
        userEmail: user?.email,
        image: feature.image,
        facilityName: feature.name,
        bookingDate: today,
        timeSlot: "6:00 PM - 8:00 PM",
        hours: 2,
        totalPrice: (feature.pricePerHour || 0) * 2,
        status: "Confirmed",
      };

      const res = await bookingFacilities(bookingInfo);

      if (res?.insertedId) {
        toast.success("🎯 Booking Successful!");
      } else {
        toast.error("Booking Failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-aos="zoom-in-up" className="w-full h-full max-w-sm sm:max-w-md mx-auto transition-transform">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-4 sm:p-5 shadow-xl shadow-slate-100 dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-slate-800/60 transition-all duration-300 flex flex-col group relative overflow-hidden h-full">
        
        {/* ১. ইমেজ এবং স্পোর্টস ক্যাটাগরি পিল (প্রিমিয়াম গ্লাস মরফিজম ব্যাজ) */}
        <Link href={`/featureCartDetails/${_id}`} className="relative h-48 w-full overflow-hidden rounded-[2rem] block bg-slate-100 dark:bg-slate-950">
          {isValidImage ? (
            <Image
              src={image}
              alt={name || "Facility Image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 gap-1.5 bg-orange-50/50 dark:bg-orange-950/20">
              <ImageOff size={32} className="stroke-[1.5]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-orange-500">No Preview Available</span>
            </div>
          )}
          
          {sportType && (
            <span className="absolute top-4 left-4 bg-orange-500/80 dark:bg-orange-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md bg-opacity-90">
              <Activity size={12} className="stroke-[3]" />
              {sportType}
            </span>
          )}
        </Link>

        {/* ২. ডিটেইলস বডি এবং ডেসক্রিপশন (সার্ভার-ক্লায়েন্ট সেফ লাইন ক্ল্যাম্পিং) */}
        <div className="flex flex-col flex-grow pt-5 px-1 justify-between">
          <Link href={`/featureCartDetails/${_id}`} className="space-y-3 block">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors">
              {name}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium min-h-[40px] sm:min-h-[48px]">
              {description || "Experience premium sporting facilities with top-tier amenities and dynamic environment."}
            </p>

            {/* লোকেশন এবং প্রাইস পিল (আল্ট্রা-রেস্পনসিভ সেকশন) */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] items-center gap-3 md:gap-4 border-t border-slate-50 dark:border-slate-800/60 pt-4 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-semibold bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                <MapPin size={14} className="text-rose-500 flex-shrink-0" />
                <span className="line-clamp-1 truncate text-slate-600 dark:text-slate-300 font-bold">{location || "Uttara Arena, Dhaka"}</span>
              </div>

              <div className="text-center md:text-right flex md:flex-col items-center justify-center md:items-end gap-1 md:gap-0 shrink-0">
                <span className="block text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Rate</span>
                <div className="flex items-center text-slate-800 dark:text-white font-black text-lg">
                  <DollarSign size={16} className="text-orange-500 -mr-0.5" />
                  <span>{pricePerHour || 0}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-0.5">/hr</span>
                </div>
              </div>
            </div>
          </Link>

          {/* ৩. অ্যাকশন বাটন গ্রুপ (லோடிங் হ্যান্ডলিং এবং স্টাইলিং) */}
          <div className="pt-5 mt-1">
            {user ? (
              <button
                disabled={loading}
                onClick={() => handleBooking(facilities)}
                className="btn btn-md sm:btn-lg w-full bg-[#163962] hover:bg-orange-500 dark:bg-slate-800 dark:hover:bg-orange-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 border-none text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-[#163962]/10 active:scale-95 transition-all gap-2 duration-300"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <span>Book Venue Now</span>
                    <ArrowRight size={16} className="stroke-[2.5]" />
                  </>
                )}
              </button>
            ) : (
              <Link href="/login" className="block w-full">
                <button className="btn btn-md sm:btn-lg w-full bg-[#163962] hover:bg-orange-500 dark:bg-slate-800 dark:hover:bg-orange-500 border-none text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span>Login to Book</span>
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </Link>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default FacilitiesCard;
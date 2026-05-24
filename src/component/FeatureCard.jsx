"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities, myBookingFacilities } from "@/lib/data";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ImageOff, DollarSign, Clock, ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const FeatureCard = ({ feature }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isBooking, setIsBooking] = useState(false);

  const imageSrc = feature?.image || feature?.img;
  const isValidImage = typeof imageSrc === "string" && imageSrc.trim() !== "";
  const userData = session?.user;

  const handleBooking = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userData) {
      router.push("/login");
      return;
    }

    setIsBooking(true);
    try {
      const myBooking = await myBookingFacilities(userData.id);
      const matchBooking = myBooking?.find(
        (item) => item.facility_id === feature._id
      );

      if (matchBooking) {
        toast.info("This facility is already in your booking choices.");
        return;
      }

      const bookingInfo = {
        facility_id: feature._id,
        userId: userData?.id,
        userEmail: userData?.email,
        image: feature.image,
        facilityName: feature.name,
        bookingDate: new Date(),
        timeSlot: "6pm - 8pm",
        hours: 2,
        totalPrice: feature.pricePerHour,
      };

      const res = await bookingFacilities(bookingInfo);
      if (res?.insertedId) {
        toast.success("Booking Successful!");
      } else {
        toast.error("Booking Failed. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <AnimateOnScroll>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-[380px] mx-auto h-full"
      >
        <div className="group relative flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          
          <Link href={`/featureCartDetails/${feature._id}`} className="flex-1 flex flex-col">
            <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
              {isValidImage ? (
                <Image
                  src={imageSrc}
                  alt={feature?.name || "Facility Image"}
                  fill
                  sizes="(max-w-700px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 gap-2">
                  <ImageOff size={32} className="stroke-[1.5]" />
                  <span className="text-[10px] font-black tracking-widest uppercase">No Preview Available</span>
                </div>
              )}
              
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white font-black text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-0.5">
                <DollarSign size={13} className="text-orange-500 stroke-[3]" />
                <span>{feature.pricePerHour || "0"}</span>
                <span className="text-slate-400 dark:text-slate-500 font-medium text-[10px] ml-0.5">/ hr</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1">
                  {feature.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                  {feature.description || "No description provided for this venue facility."}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-50 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Clock size={13} className="text-orange-500" />
                  <span>2 Hours Slot</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="p-5 pt-0">
            {userData ? (
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="btn btn-md w-full bg-slate-900 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 border-none text-white font-black rounded-xl active:scale-95 transition-all gap-2 text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {isBooking ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <>
                    <span>Book Venue</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </>
                )}
              </button>
            ) : (
              <Link href="/login" className="block w-full">
                <button className="btn btn-md w-full bg-slate-900 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500 border-none text-white font-black rounded-xl active:scale-95 transition-all gap-2 text-xs uppercase tracking-wider">
                  <span>Login to Book</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </button>
              </Link>
            )}
          </div>

        </div>
      </motion.div>
    </AnimateOnScroll>
  );
};

export default FeatureCard;
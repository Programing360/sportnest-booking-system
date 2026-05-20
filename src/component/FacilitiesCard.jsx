"use client";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities } from "@/lib/data";
import { Button, Card, CardFooter, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  MapPin,
  DollarSign,
  Activity,
  CalendarDays,
  ImageOff,
} from "lucide-react";

const FacilitiesCard = ({ facilities }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const { _id, name, image, description, pricePerHour, sportType, location } =
    facilities || {};

  const isValidImage = typeof image === "string" && image.trim() !== "";

  const handleBooking = async (e, feature) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const bookingInfo = {
      userId: user?.id,
      facilityName: feature.name,
      bookingDate: today,
      timeSlot: "6:00 PM - 8:00 PM",
      hours: 2,
      totalPrice: (feature.pricePerHour || 0) * 2,
      status: "Confirmed",
    };

    try {
      const res = await bookingFacilities(bookingInfo);
      if (res?.insertedId) {
        toast.success("🎯 Booking Successful! Check My Bookings.");
      } else {
        toast.error("Booking Failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full border border-gray-100 hover:border-orange-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/[0.03] transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col justify-between group relative">
        {/* Detail Page Link wrapper */}
        <Link
          href={`/facilitiesCartDetails/${_id}`}
          className="flex-1 flex flex-col"
        >
          <div className="relative w-full h-52 md:h-56 overflow-hidden bg-gray-50 shrink-0">
            {isValidImage ? (
              <Image
                src={image}
                alt={name || "Facility"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1 bg-orange-50/50">
                <ImageOff size={24} className="text-orange-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  No Preview
                </span>
              </div>
            )}

            {/* Floating Sport Tag Badge */}
            {sportType && (
              <div className="absolute top-4 left-4 z-10">
                <Chip
                  startcontent={<Activity size={12} />}
                  className="bg-white/90 backdrop-blur-md text-orange-500 font-extrabold text-[10px] uppercase tracking-wider border border-orange-100/50 shadow-sm h-7"
                >
                  {sportType}
                </Chip>
              </div>
            )}
          </div>

      
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
          
              <h2 className="text-xl font-black text-gray-900 tracking-tight line-clamp-1 group-hover:text-orange-500 transition-colors duration-300">
                {name}
              </h2>

             
              <p className="text-xs md:text-sm text-gray-400 font-medium line-clamp-2 leading-relaxed min-h-[40px]">
                {description ||
                  "Experience premium sporting facilities with top-tier amenities and dynamic environment."}
              </p>
            </div>

          
            <div className="pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
          
              <div className="flex items-center gap-1 text-gray-500 max-w-[60%]">
                <MapPin size={14} className="text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-gray-600 truncate">
                  {location || "Main Arena"}
                </span>
              </div>

              
              <div className="text-right shrink-0">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  Per Hour
                </p>
                <div className="flex items-center text-base font-black text-orange-500">
                  <DollarSign size={14} className="-mr-0.5" />
                  <span>{pricePerHour || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

       <CardFooter className="p-5 pt-0 w-full shrink-0">
          {user ? (
            <Button
              isLoading={loading}
              onClick={(e) => handleBooking(e, facilities)}
              className="w-full bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider h-12 rounded-2xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all cursor-pointer"
            >
              Book Slot Now
            </Button>
          ) : (
            <Link className="w-full" href="/login">
              <Button className="w-full bg-gray-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider h-12 rounded-2xl active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer">
                Login to Book
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FacilitiesCard;

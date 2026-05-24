"use client";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities, myBookingFacilities } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MapPin, Users, DollarSign, Clock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const CardDetails = ({ featureCard }) => {
  const { data: session } = authClient.useSession();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const user = session?.user;
  const {
    _id,
    image,
    name,
    location,
    pricePerHour,
    rating = 4.8, // ফলব্যাক রেটিং যদি ডাটাতে না থাকে
    capacity,
    description,
  } = featureCard;

  const handleBooking = async () => {
    const myBooking = await myBookingFacilities(user.id);
    const matchBooking = myBooking.find((item) => item.facility_id === _id);

    if (matchBooking) {
      return toast.warn("Already add your Choice Item");
    }

    const bookingInfo = {
      facility_id: _id,
      userId: user?.id,
      userEmail: user?.email,
      image: image,
      facilityName: name,
      bookingData: today,
      totalPrice: pricePerHour,
      timeSlot: "6pm - 8pm",
      hours: 2,
    };

    const res = await bookingFacilities(bookingInfo);

    if (res?.insertedId) {
      toast.success("Booking Successful! Play Tomorrow.");
    } else {
      toast.error("Booking Failed. Try again.");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* --- বাম পাশ: প্রিমিয়াম ইমেজ গ্যালারি কন্টেইনার --- */}
          <div
            data-aos="fade-right"
            className="lg:col-span-5 w-full h-[300px] sm:h-[400px] lg:h-[520px] relative rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-md"
          >
            <Image
              src={image}
              alt={name}
              fill
              priority
              sizes="(max-w-1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* --- ডান পাশ: ভেন্যু ইনফরমেশন ও বুকিং কার্ড --- */}
          <div
            data-aos="fade-left"
            className="lg:col-span-7 flex flex-col justify-between h-full space-y-6"
          >
            {/* হেডার: টাইটেল, লোকেশন এবং রেটিং */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
                  {name}
                </h1>

                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3.5 py-1.5 rounded-2xl w-fit self-start sm:self-auto shadow-sm">
                  <FaStar className="text-amber-500 text-sm sm:text-base" />
                  <span className="text-sm font-black text-slate-800 dark:text-amber-400">
                    {rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500">
                <MapPin size={16} className="text-orange-500 flex-shrink-0" />
                <span className="leading-relaxed">{location}</span>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-orange-500">
                About this venue
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-[#163962] dark:text-white">
                  <Users size={20} className="text-orange-500" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Total Capacity
                  </span>
                  <p className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base">
                    {capacity} Players
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-[#163962] dark:text-white">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Base Rate
                  </span>
                  <p className="font-extrabold text-slate-800 dark:text-white text-sm sm:text-base">
                    ৳ {pricePerHour} / hr
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-2 group">
                <FaCheckCircle className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>Floodlights Included</span>
              </span>
              <span className="flex items-center gap-2 group">
                <FaCheckCircle className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>Free Parking</span>
              </span>
              <span className="flex items-center gap-2 group">
                <FaCheckCircle className="text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>Changing Rooms</span>
              </span>
            </div>

            {/* --- বটম একশন বার: ফাইনাল প্রাইসিং এবং বুকিং বাটন --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 dark:bg-slate-950/60 p-5 sm:p-6 rounded-[2rem] shadow-xl mt-6">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black tracking-widest text-orange-400 uppercase">
                  Estimated Price
                </p>
                <div className="flex items-baseline justify-center sm:justify-start text-white font-black mt-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                    ৳ {pricePerHour}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    / hour
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-auto sm:min-w-[200px]">
                {user ? (
                  <button
                    onClick={handleBooking}
                    className="btn btn-md sm:btn-lg w-full bg-orange-500 hover:bg-orange-600 border-none text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2 group"
                  >
                    <span>Book Venue Now</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
                    />
                  </button>
                ) : (
                  <Link href="/login" className="block w-full">
                    <button className="btn btn-md sm:btn-lg w-full bg-orange-500 hover:bg-orange-600 border-none text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2 group">
                      <span>Instant Book</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform stroke-[2.5]"
                      />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

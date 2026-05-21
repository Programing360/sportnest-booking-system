"use client";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities } from "@/lib/data";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaStar, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const CardDetails = ({ featureCard }) => {
  const { data: session } = authClient.useSession();
const [today, setToday] = useState("");

useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, [setToday]);

  const user = session?.user;
  const {
    _id,
    image,
    name,
    location,
    pricePerHour,
    rating,
    capacity,
    description,
  } = featureCard;

  const handleBooking = async () => {
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

    if (res.insertedId) {
      toast.success("Booking Successful");
    } else {
      toast.error("Booking Failed");
    }
  };
  
  return (
    <div className="container mx-auto mt-20 ">
      <Card className="w-full rounded-4xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="max-h-[500px]">
            <Image
              src={featureCard?.image}
              alt=""
              width={600}
              height={700}
              className="rounded-4xl  object-cover h-full"
            ></Image>
          </div>
          <div>
            <div className="flex-1 py-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="animate-text flex items-center gap-2 text-purple-600 mb-2">
                    <span className="text-lg md:text-3xl font-black">
                      {name}
                    </span>
                  </div>

                  <h2 className="animate-text text-sm font-bold text-gray-400 mb-3 flex gap-1">
                    <span>
                      <FaLocationDot></FaLocationDot>
                    </span>
                    {location}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-2xl w-fit self-start sm:self-auto">
                  <FaStar className="text-amber-500 text-sm md:text-base" />
                  <span className="text-sm font-bold text-slate-800">
                    {rating}
                  </span>
                </div>
              </div>
              <hr className="mb-10 text-gray-300" />
              <div className="text-shadow-black-500 ">
                <h2 className="uppercase font-bold ">About this venue</h2>
                <div className="">
                  <p>{description}</p>
                </div>
                <div className="bg-[#f8fafc] p-4 rounded-lg mt-6 flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="p-2 shadow rounded-lg bg-white text-lg text-[#163962] ">
                      <FaUser size={20} className=""></FaUser>
                    </div>
                    <div className="">
                      <span className="uppercase text-sm text-gray-500">
                        Total Capacity
                      </span>
                      <p className="font-bold">{capacity} Players</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="p-2 shadow rounded-lg bg-white text-lg text-[#163962] ">
                      <FaClock size={20} className="" color="#ff6900"></FaClock>
                    </div>
                    <div className="">
                      <span className="uppercase text-sm text-gray-500">
                        Base Rate
                      </span>
                      <p className="font-bold">৳{pricePerHour} / hr</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 pt-2">
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500" /> Floodlights
                    Included
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500" /> Free Parking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500" /> Changing
                    Rooms
                  </span>
                </div>
                <div className="mt-10 flex items-center justify-between w-full">
                  <div className=" w-full">
                    <p className="text-gray-500 font-bold text-sm">
                      ESTIMATED PRICE
                    </p>
                    <p>
                      <span className="text-3xl font-bold text-[#163962]">
                        ৳{pricePerHour}
                      </span>
                      / per hour
                    </p>
                  </div>
                  <div className="w-full">
                    {user ? (
                      <Button
                        onClick={handleBooking}
                        className="w-full active:scale-95 bg-[#163962]"
                      >
                        Booking Now
                      </Button>
                    ) : (
                      <Link href={"/login"}>
                        <Button className="w-full active:scale-95 bg-[#163962]">
                          Instant Book Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardDetails;

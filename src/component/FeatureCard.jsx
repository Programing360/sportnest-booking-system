"use client";
import { authClient } from "@/lib/auth-client";
import { bookingFacilities, myBookingFacilities } from "@/lib/data";
import { Button, Card } from "@heroui/react";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const FeatureCard = ({ feature }) => {
  const { data: session } = authClient.useSession();
  const imageSrc = feature?.image || feature?.img;

  const isValidImage = typeof imageSrc === "string" && imageSrc.trim() !== "";
  const userData = session?.user;

  const handleBooking = async () => {
    if (!userData) {
      return redirect("/login");
    }

    const myBooking = await myBookingFacilities(user.id);
    const matchBooking = myBooking.find(
      (item) => item.facility_id === feature._id,
    );

    if (matchBooking) {
      return toast.success("Already add your Choice Item");
    }

    const bookingInfo = {
      facility_id: feature._id,
      userId: user?.id,
      userEmail: user?.email,
      image: feature.image,
      facilityName: feature.name,
      bookingDate: new Date(),
      timeSlot: "6pm - 8pm",
      hours: 2,
      totalPrice: feature.pricePerHour,
    };

    const res = await bookingFacilities(bookingInfo);
    if (res.insertedId) {
      toast.success("Booking Successful");
    } else {
      toast.error("Booking Failed");
    }
  };

  return (
    <div className="">
      <Card className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-4xl ">
        <Link href={`/featureCartDetails/${feature._id}`}>
          <figure>
            {isValidImage ? (
              <Image
                src={imageSrc}
                alt={feature?.name || "Facility Image"}
                width={400}
                height={400}
                className="object-cover w-full h-50 transition hover:scale-105 duration-150 rounded-3xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 gap-1.5">
                <ImageOff size={28} className="text-gray-300" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  No Preview
                </span>
              </div>
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
        </Link>
        {userData ? (
          <Button
            onClick={handleBooking}
            className="btn w-full bg-[#163962] text-white hover:scale-105 transition-all duration-200 active:scale-95 font-medium rounded-full shadow-sm text-sm "
          >
            Booking Now
          </Button>
        ) : (
          <Link href={"/login"}>
            <Button className="btn w-full bg-[#163962] text-white hover:scale-105 transition-all duration-200 active:scale-95 font-medium rounded-full shadow-sm text-sm ">
              Booking Now
            </Button>
          </Link>
        )}
      </Card>
    </div>
  );
};

export default FeatureCard;

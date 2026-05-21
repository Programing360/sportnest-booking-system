import MyBookingCard from "@/component/MyBookingCard";
import { auth } from "@/lib/auth";
import { myBookingFacilities } from "@/lib/data";
import { ArrowRight, Link, ShoppingBag } from "lucide-react";
import { headers } from "next/headers";
import React from "react";

const MyBookingPage = async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });


  const userId = sessionData?.user?.id;
  const bookingColl = await myBookingFacilities(userId);

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center">My Booking Page</h2>
      
      {bookingColl && bookingColl.length > 0 ? (
        <div className="space-y-4 mt-7 px-4">
          {bookingColl?.map((booking) => (
            <MyBookingCard
              key={booking._id || booking.id}
              bookingCard={booking}
            />
          ))}
        </div>
      ) : (
       
        <div className="w-full bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-16 text-center shadow-sm max-w-2xl mx-auto relative overflow-hidden group">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-100/40 blur-[80px] rounded-full pointer-events-none" />

          
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-100/50 group-hover:scale-110 transition-transform duration-300">
            <ShoppingBag size={28} className="stroke-[1.8]" />
          </div>

       
          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-2">
            No Bookings Placed Yet
          </h3>
          <p className="text-gray-400 font-medium text-sm max-w-sm mx-auto leading-relaxed mb-8">
            Looks like you haven't reserved any facilities or destinations yet.
            Explore our top arenas and secure your slot today!
          </p>

          <Link href="/allFacilities">
            <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-purple-600/10 cursor-pointer group/btn">
              <span>Find Facilities</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;

import { Avatar, Card } from "@heroui/react";
import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Ahsan Habib",
      role: "Football Enthusiast",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "SportNest completely changed how our team books turf slots. No more endless phone calls, just premium venues booked in seconds! Highly recommended.",
    },
    {
      id: 2,
      name: "Sajid Ahmed",
      role: "Amateur Tennis Player",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      comment:
        "Finding indoor tennis courts during the rainy season used to be a nightmare. Thanks to this platform, I can track live slot openings and play whenever I want.",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      role: "Corporate Event Organizer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 4,
      comment:
        "We arranged our annual corporate sports tournament through SportNest. The customer support was top-notch, and the multi-court booking process was seamless.",
    },
  ];
  return (
    <div className="container mx-auto mt-20 px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 border-b border-slate-100 pb-6">
        <div>
          <span className="text-sm text-orange-500 uppercase tracking-widest">
            REVIEWS
          </span>
          <h1 className="text-sm md:text-3xl font-bold text-slate-800 ">
            Whats Our Players Say
          </h1>
        </div>
        <p className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
          Discover how athletes, clubs, and everyday players are upgrading their
          game with SportNest.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((item) => (
          <Card
            data-aos="fade-left"
            key={item.id}
            className="border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-3xl bg-white relative overflow-visible pt-4"
          >
            <div className="absolute top-[-18px] left-6 w-9 h-9 rounded-xl bg-[#163962] text-white flex items-center justify-center text-sm shadow-md shadow-[#163962]/20">
              <FaQuoteLeft />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between h-full gap-6">
              {/* Review Text */}
              <p className="text-sm md:text-base text-gray-600 italic leading-relaxed">
                {item.comment}
              </p>

              {/* User Info & Rating Layout */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={item.image}
                    className="w-11 h-11 text-large rounded-xl object-cover bg-slate-100"
                    isbordered="true"
                    color="default"
                  />
                  <div>
                    <h4 className="text-sm md:text-md font-bold text-slate-800 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-xs text-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
<div></div>;

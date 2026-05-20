import { Card } from "@heroui/react";
import React from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaCreditCard,
  FaShieldAlt,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaCalendarCheck className="text-2xl text-orange-400" />,
      title: "Easy & Instant Booking",
      description:
        "Book your favorite sports venues in just a few clicks with real-time slot availability.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-2xl text-orange-400" />,
      title: "Verified Facilities",
      description:
        "We ensure all listed stadiums, courts, and fields meet top-quality and safety standards.",
    },
    {
      id: 3,
      icon: <FaClock className="text-2xl text-orange-400" />,
      title: "Flexible Scheduling",
      description:
        "Choose slots that fit your busy timeline, from early morning matches to late-night games.",
    },
    {
      id: 4,
      icon: <FaCreditCard className="text-2xl text-orange-400" />,
      title: "Secure Payments",
      description:
        "Enjoy hassle-free and completely secure payment gateways for all your bookings.",
    },
  ];
  return (
    <div className="bg-slate-50/50 py-16 md:py-24 mt-20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
            Our Benefits
          </span>
          <h1 className="text-lg md:text-3xl font-bold">
            Why Choose SportNest?
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
            We provide a seamless and premium experience for athletes and sports
            enthusiasts to connect with top-tier facilities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((card) => (
            <Card key={card.id} className="border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden bg-white group">
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#163962]/5 group-hover:bg-[#163962] flex items-center justify-center transition-colors duration-300 mb-5">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl text-orange-500 group-hover:text-white transition-colors duration-300">
                        {card.icon}
                    </div>
                  </div>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-[#163962] transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

"use client";
import React from "react";
import banner2 from "../../public/assets/banner2.png";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative w-full h-[550px] sm:h-[600px] md:h-[680px] lg:h-[750px] overflow-hidden flex items-center justify-center">
      
      {/* Background Image Container with Next.js Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner2}
          alt="SportNest Premium Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 animate-fade-in"
        />
      </div>

      {/* Global Gradient Overlay (Ensures text readability on ALL screens) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:bg-gradient-to-b md:from-[#163962]/60 md:via-black/50 md:to-black/70"></div>

      {/* Hero Content Area */}
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-6">
        
        {/* Subtitle / Tagline */}
        <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
          Welcome to SportNest
        </span>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
          Find Your Perfect Facility. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
            Book Today, Play Tomorrow!
          </span>
        </h1>

        {/* Short Description */}
        <p className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
          Discover top-rated sports venues in your area. Quick, secure, and easy booking for every level of play.
        </p>

        {/* Interactive Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 sm:pt-8">
          <Button
            radius="full"
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 md:h-14 px-8 text-sm md:text-base shadow-lg shadow-orange-500/20 active:scale-98 transition-all gap-2"
          >
            Explore Facilities 
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="bordered"
            radius="full"
            className="w-full sm:w-auto border-2 border-white hover:border-orange-400 text-white hover:text-white hover:bg-orange-500/10 font-semibold h-12 md:h-14 px-8 text-sm md:text-base backdrop-blur-sm transition-all"
          >
            My Bookings
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
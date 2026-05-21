"use client";
import React, { useEffect } from "react";
import banner2 from "../../public/assets/banner2.png";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <div 
      data-aos="fade-zoom-in"
      className="relative w-full h-[550px] sm:h-[600px] md:h-[680px] lg:h-[750px] overflow-hidden flex items-center justify-center bg-slate-900"
    >
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={banner2}
          alt="SportNest Premium Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:bg-gradient-to-b md:from-[#163962]/40 md:via-black/50 md:to-black/80"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-6"
      >
        <motion.div variants={itemVariants} className="inline-block">
          <span className="bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full backdrop-blur-md">
            Welcome to SportNest
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto"
        >
          Find Your Perfect Facility. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
            Book Today, Play Tomorrow!
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium opacity-90"
        >
          Discover top-rated sports venues in your area. Quick, secure, and easy booking for every level of play.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 sm:pt-8"
        >
          <Link href="/allFacilities" className="w-full sm:w-auto">
            <button className="btn w-full sm:w-auto bg-orange-500 hover:bg-orange-600 border-none text-white font-bold h-12 md:h-14 px-8 text-sm md:text-base rounded-full shadow-xl shadow-orange-500/20 active:scale-95 transition-transform group gap-2">
              <span>Explore Facilities</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </button>
          </Link>

          <Link href="/myBookings" className="w-full sm:w-auto">
            <button className="btn w-full sm:w-auto border-2 border-white hover:border-orange-500 bg-transparent hover:bg-orange-500/10 text-white font-bold h-12 md:h-14 px-8 text-sm md:text-base rounded-full backdrop-blur-sm active:scale-95 transition-transform gap-2">
              <CalendarDays size={16} className="stroke-[2.5]" />
              <span>My Bookings</span>
            </button>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Banner;
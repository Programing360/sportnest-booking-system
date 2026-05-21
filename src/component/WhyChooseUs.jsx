"use client";
import React from "react";
import { CalendarCheck, ShieldCheck, Clock, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <CalendarCheck size={26} />,
      title: "Easy & Instant Booking",
      description: "Book your favorite sports venues in just a few clicks with real-time slot availability.",
      color: "from-orange-500 to-amber-500",
      shadow: "shadow-orange-500/10"
    },
    {
      id: 2,
      icon: <ShieldCheck size={26} />,
      title: "Verified Facilities",
      description: "We ensure all listed stadiums, courts, and fields meet top-quality and safety standards.",
      color: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/10"
    },
    {
      id: 3,
      icon: <Clock size={26} />,
      title: "Flexible Scheduling",
      description: "Choose slots that fit your busy timeline, from early morning matches to late-night games.",
      color: "from-purple-600 to-pink-600",
      shadow: "shadow-purple-500/10"
    },
    {
      id: 4,
      icon: <CreditCard size={26} />,
      title: "Secure Payments",
      description: "Enjoy hassle-free and completely secure payment gateways for all your bookings.",
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/10"
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <div className="bg-slate-50/60 dark:bg-slate-950/40 py-20 md:py-28 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          >
            Our Benefits
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
          >
            Why Choose SportNest?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-4 max-w-xl mx-auto leading-relaxed"
          >
            We provide a seamless and premium experience for athletes and sports
            enthusiates to connect with top-tier facilities.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-md hover:shadow-2xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 group ${card.shadow}`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300 mb-6`}>
                {card.icon}
              </div>
              
              <h2 className="text-xl font-black text-slate-800 dark:text-white mb-3 tracking-tight transition-colors duration-300">
                {card.title}
              </h2>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
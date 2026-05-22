"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AnimateOnScroll({ children }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-sm mx-auto"
    >
      <div data-aos="fade-up">
        {children}
      </div>
    </motion.div>
  );
}
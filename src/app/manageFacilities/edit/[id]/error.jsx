"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 antialiased relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড সফট গ্লো এওরা (Aura Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-200/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-rose-100/50 blur-[80px] rounded-full pointer-events-none" />

      {/* মেইন ইরর কার্ড কন্টেইনার */}
      <div className="max-w-xl w-full text-center relative z-10 space-y-8 p-6">
        
        {/* বিশাল সাইজের বোল্ড ৪MD৪ কোড */}
        <div className="relative select-none">
          <h1 className="text-[120px] sm:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-purple-950 to-purple-900 tracking-tighter leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <AlertCircle size={220} className="text-purple-600 stroke-[1]" />
          </div>
        </div>

        {/* টেক্সট মেসেজ সেকশন */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* অ্যাকশন বোতাম গ্রুপ (daisyUI ও Tailwind) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          
          {/* ১. হোমপেজে ফিরে যাওয়ার মেইন বোতাম */}
          <Link href="/" className="w-full sm:w-auto">
            <button className="btn bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider px-6 h-12 rounded-2xl border-none shadow-lg shadow-purple-600/20 flex items-center gap-2 w-full justify-center active:scale-95 transition-all">
              <Home size={15} />
              <span>Back to Home</span>
            </button>
          </Link>

          {/* ২. আগের পেজে ফিরে যাওয়ার সেকেন্ডারি বোতাম */}
          <button 
            onClick={() => window.history.back()}
            className="btn bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-wider px-6 h-12 flex items-center gap-2 w-full sm:w-auto justify-center active:scale-95 transition-all shadow-sm"
          >
            <ArrowLeft size={15} />
            <span>Go Back</span>
          </button>

        </div>

        {/* নিচের ছোট ফুটার লিংক */}
        <div className="pt-8 border-t border-gray-200/50 max-w-xs mx-auto">
          <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">
            Need Help? <Link href="/contact" className="text-purple-600 hover:underline">Contact Support</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
"use client";
import React from 'react';
import { Spinner } from "@heroui/react";

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-slate-50/70 backdrop-blur-md flex flex-col items-center justify-center z-50 min-h-screen w-full select-none animate-fade-in">
            <div className="flex flex-col items-center justify-center space-y-4">
                
                {/* HeroUI Custom Branded Spinner Wrapper */}
                <div className="relative flex items-center justify-center p-4 rounded-full bg-white shadow-xl border border-slate-100">
                    <Spinner 
                        size="lg" 
                        color="warning" // Uses your brand orange accent
                        className={{
                            circle1: "border-b-[#163962]", // Combines your brand blue
                            circle2: "border-b-orange-500",
                        }}
                    />
                    {/* Tiny Center Icon Glow */}
                    <div className="absolute text-xl animate-pulse">
                        ⚽
                    </div>
                </div>

                {/* Animated Branding Text */}
                <div className="text-center space-y-1">
                    <h3 className="text-xl font-black text-[#163962] tracking-wide">
                        Sport<span className="text-orange-500">Nest</span>
                    </h3>
                    
                    {/* Pulsing Subtext */}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">
                        Preparing Arena...
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Loading;
"use client";
import React from 'react';
import Link from 'next/link';
import { Button, Card, CardBody } from "@heroui/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
            
            {/* Main Interactive Container Card */}
            <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-2xl rounded-3xl p-4 sm:p-8 text-center overflow-hidden relative">
                
                {/* Background Decorative Gradient Blur */}
                <div className="absolute -top-10 -right-10 w-40 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-44 bg-[#163962]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-8">
                    
                    {/* Thematic Big 404 Section */}
                    <div className="relative">
                        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#163962] to-[#122e50] leading-none drop-shadow-sm">
                            404
                        </h1>
                        {/* Bouncing sport badge over the text */}
                        <div className="absolute -top-3 -right-4 sm:-right-6 text-4xl sm:text-5xl animate-bounce">
                            ⚽
                        </div>
                    </div>

                    {/* Text Headers */}
                    <div className="space-y-2 max-w-md mx-auto">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
                            Match Postponed! Page Not Found
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                            The stadium or facility page you are looking for has been moved, renamed, or doesn't exist in our arena database.
                        </p>
                    </div>

                    {/* Interactive Action CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm pt-2">
                        {/* Go Back Button */}
                        <Button
                            variant="bordered"
                            radius="xl"
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold h-12 px-6 text-sm gap-2 transition-all active:scale-98"
                        >
                            <FaArrowLeft className="text-xs" />
                            Go Back
                        </Button>

                        {/* Back to Home Button (Next.js Link Integration) */}
                        <Button
                            as={Link}
                            href="/"
                            radius="xl"
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 px-8 text-sm gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-98"
                        >
                            <FaHome className="text-sm" />
                            Return Home
                        </Button>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default NotFoundPage;
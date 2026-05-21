"use client";

import React from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { CalendarDays, Clock, DollarSign, Activity, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

const MyBookingCard = ({ bookingCard, onCancelBooking }) => {
  
  const { facilityName, hours, status, timeSlot, totalPrice, id } = bookingCard || {};

 
  const getStatusConfig = (statusText) => {
    switch (statusText?.toLowerCase()) {
      case "confirmed":
        return {
          color: "success",
          icon: <CheckCircle2 size={14} />,
          class: "bg-emerald-50 text-emerald-700 border-emerald-200/60"
        };
      case "pending":
        return {
          color: "warning",
          icon: <AlertCircle size={14} />,
          class: "bg-amber-50 text-amber-700 border-amber-200/60"
        };
      case "cancelled":
        return {
          color: "danger",
          icon: <XCircle size={14} />,
          class: "bg-rose-50 text-rose-700 border-rose-200/60"
        };
      default:
        return {
          color: "default",
          icon: <Activity size={14} />,
          class: "bg-gray-50 text-gray-700 border-gray-200/60"
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const isCancelled = status?.toLowerCase() === "cancelled";

  return (
    <Card 
      shadow="none" 
      className="w-full bg-white border border-gray-100 hover:border-purple-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-purple-600/[0.02] transition-all duration-400 mb-5 group relative overflow-hidden"
    >
      <div className="p-5 sm:p-6">
       
        <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-transparent group-hover:bg-purple-600 transition-colors duration-300" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
     
          <div className="space-y-3.5 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
            
              <Chip
                startcontent={statusConfig.icon}
                variant="flat"
                className={`font-extrabold text-[10px] uppercase tracking-wider border px-2.5 h-7 ${statusConfig.class}`}
              >
                {status || "Unknown"}
              </Chip>

              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
                <Clock size={12} className="text-purple-500" />
                <span>{hours} {hours > 1 ? "Hrs Slot" : "Hr Slot"}</span>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight group-hover:text-purple-600 transition-colors duration-300">
              {facilityName}
            </h1>

            <div className="inline-flex items-center gap-2 bg-gray-50/70 border border-gray-100/80 px-3 py-2 rounded-xl text-xs font-bold text-gray-600">
              <CalendarDays size={14} className="text-cyan-500" />
              <span className="font-mono tracking-wide">{timeSlot}</span>
            </div>
          </div>

          
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-50">
            
          
            <div className="lg:text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Total Amount</p>
              <div className="flex items-center text-xl font-black text-gray-900">
                <DollarSign size={16} className="text-purple-500 -mr-0.5 shrink-0" />
                <span>{totalPrice?.toLocaleString()}</span>
              </div>
            </div>
            <Button
              size="sm"
              disabled={isCancelled}
              onClick={() => onCancelBooking && onCancelBooking(id)}
              className={`font-bold px-4 h-9 rounded-xl uppercase tracking-wider text-[10px] transition-all active:scale-95 cursor-pointer ${
                isCancelled
                  ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  : "bg-white text-rose-600 border border-rose-100 hover:bg-rose-50 hover:border-rose-200 shadow-sm shadow-rose-100"
              }`}
            >
              {isCancelled ? "Cancelled" : "Cancel Booking"}
            </Button>

          </div>

        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;
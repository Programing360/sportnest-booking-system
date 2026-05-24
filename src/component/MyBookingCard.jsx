"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  ImageOff,
} from "lucide-react";
import BookingDelete from "./shered/BookingDelete";

const MyBookingCard = ({ bookingCard }) => {
  const { facilityName, hours, status, timeSlot, totalPrice, _id, image,facility_id } =
    bookingCard || {};

  const isValidImage = typeof image === "string" && image.trim() !== "";

  const getStatusConfig = (statusText) => {
    switch (statusText?.toLowerCase()) {
      case "confirmed":
        return {
          icon: <CheckCircle2 size={13} className="shrink-0" />,
          class: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30",
        };
      case "pending":
        return {
          icon: <AlertCircle size={13} className="shrink-0" />,
          class: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30",
        };
      case "cancelled":
        return {
          icon: <XCircle size={13} className="shrink-0" />,
          class: "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/30",
        };
      default:
        return {
          icon: <Activity size={13} className="shrink-0" />,
          class: "bg-slate-50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/30",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card
      shadow="none"
      className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl shadow-md hover:shadow-xl shadow-slate-100/60 dark:shadow-none transition-all duration-300 mt-4 group relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-transparent group-hover:bg-orange-500 transition-colors duration-300 z-20" />

      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 w-full">
        
        <div className="relative w-full sm:w-40 h-28 shrink-0 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50">
          {isValidImage ? (
            <Image
              src={image}
              alt={facilityName || "Facility"}
              fill
              sizes="(max-width: 640px) 100vw, 160px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 gap-1.5">
              <ImageOff size={24} className="stroke-[1.5]" />
              <span className="text-[9px] font-black tracking-widest uppercase">No Preview</span>
            </div>
          )}
        </div>

        <div className="space-y-2.5 flex-1 w-full text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <Chip
              startContent={statusConfig.icon}
              variant="flat"
              className={`font-black text-[10px] uppercase tracking-wider border h-6 px-2 rounded-lg ${statusConfig.class}`}
            >
              {status || "Unknown"}
            </Chip>

            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800/60">
              <Clock size={11} className="text-orange-500 stroke-[2.5]" />
              <span>
                {hours} {hours > 1 ? "Hrs Slot" : "Hr Slot"}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
            {facilityName}
          </h3>

          <div className="inline-flex items-center gap-2 bg-slate-50/80 dark:bg-slate-950/80 border border-slate-100/80 dark:border-slate-800/40 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400">
            <CalendarDays size={13} className="text-[#163962] dark:text-orange-400" />
            <span className="font-medium tracking-wide">{timeSlot}</span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50 dark:border-slate-800/40 w-full sm:w-auto shrink-0">
          <div className="sm:text-right">
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mb-0.5">
              Total Amount
            </p>
            <div className="flex items-center text-xl font-black text-slate-800 dark:text-white">
              <DollarSign size={15} className="text-orange-500 -mr-0.5 shrink-0 stroke-[2.5]" />
              <span>{totalPrice?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-auto sm:w-full">
            <Link href={`/featureCartDetails/${facility_id}`} className="w-full">
              <Button
                size="sm"
                variant="flat"
                startContent={<Eye size={12} className="stroke-[2.5]" />}
                className="font-black px-3.5 h-8 rounded-xl uppercase tracking-wider text-[10px] w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                View
              </Button>
            </Link>
            <BookingDelete id={_id} />
          </div>
        </div>

      </div>
    </Card>
  );
};

export default MyBookingCard;
"use client";
import React, { useState } from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Trash2,
  ImageOff,
} from "lucide-react";

import { toast } from "react-toastify";
import BookingDelete from "./shered/BookingDelete";

const MyBookingCard = ({ bookingCard }) => {
  const { facilityName, hours, status, timeSlot, totalPrice, _id, image } =
    bookingCard || {};

  const isValidImage = typeof image === "string" && image.trim() !== "";

  const defaultImage =
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=500&auto=format&fit=crop";

  const getStatusConfig = (statusText) => {
    switch (statusText?.toLowerCase()) {
      case "confirmed":
        return {
          color: "success",
          icon: <CheckCircle2 size={14} />,
          class: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        };
      case "pending":
        return {
          color: "warning",
          icon: <AlertCircle size={14} />,
          class: "bg-amber-50 text-amber-700 border-amber-200/60",
        };
      case "cancelled":
        return {
          color: "danger",
          icon: <XCircle size={14} />,
          class: "bg-rose-50 text-rose-700 border-rose-200/60",
        };
      default:
        return {
          color: "default",
          icon: <Activity size={14} />,
          class: "bg-gray-50 text-gray-700 border-gray-200/60",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card
      shadow="none"
      className="w-full bg-white  border-gray-100 hover:border-purple-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-purple-600/[0.02] transition-all duration-400 mb-5 group relative overflow-hidden "
    >
      <div className="p-0">
        <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-transparent group-hover:bg-purple-600 transition-colors duration-300 z-20" />

        <div className="flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 w-full">
          <div className="relative w-full sm:w-44 h-32 shrink-0 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
            <Image
              src={isValidImage ? image : defaultImage}
              alt={facilityName || "Facility Image"}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {!isValidImage && (
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center text-white">
                <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  <ImageOff size={10} />
                  <span>Default Preview</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1 w-full text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap">
              <Chip
                startcontent={statusConfig.icon}
                variant="flat"
                className={`font-extrabold text-[10px] uppercase tracking-wider border px-2.5 h-7 ${statusConfig.class}`}
              >
                {status || "Unknown"}
              </Chip>

              <div className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
                <Clock size={12} className="text-purple-500" />
                <span>
                  {hours} {hours > 1 ? "Hrs Slot" : "Hr Slot"}
                </span>
              </div>
            </div>

            <h1 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-purple-600 transition-colors duration-300">
              {facilityName}
            </h1>

            <div className="inline-flex items-center gap-2 bg-gray-50/70 border border-gray-100/80 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600">
              <CalendarDays size={14} className="text-cyan-500" />
              <span className="font-mono tracking-wide">{timeSlot}</span>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50 w-full sm:w-auto shrink-0">
            <div className="sm:text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                Total Amount
              </p>
              <div className="flex items-center text-xl font-black text-gray-900">
                <DollarSign
                  size={16}
                  className="text-purple-500 -mr-0.5 shrink-0"
                />
                <span>{totalPrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center sm:flex-col gap-2 w-full sm:w-auto">
              <Link href={`/featureCartDetails/${_id}`}>
                <Button
                  size="sm"
                  variant="flat"
                  startcontent={<Eye size={12} />}
                  className="font-bold px-4 h-9 rounded-xl uppercase tracking-wider text-[10px] w-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all cursor-pointer"
                >
                  View
                </Button>
              </Link>
            </div>
            <BookingDelete id={_id}></BookingDelete>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;

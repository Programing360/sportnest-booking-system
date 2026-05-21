"use client";
import { cancelBookingFacilities } from "@/lib/data";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingDelete = ({ id, isCancelled }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const onCancelBooking = async (id) => {
    if (id) {
      setIsDeleting(true);
      try {
        const res = await cancelBookingFacilities(id);
        if (res.deletedCount > 0) {
          toast.success("Booking permanently Deleted");
          window.location.reload();
        }
      } catch (error) {
        toast.error("Failed to delete booking");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button
          size="sm"
          isLoading={isDeleting}
          disabled={isCancelled || isDeleting}
          startcontent={!isDeleting && <Trash2 size={12} />}
          className={`font-bold px-4 h-9 rounded-xl uppercase tracking-wider text-[10px] transition-all active:scale-95 cursor-pointer w-full ${
            isCancelled
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-white text-rose-600 border border-rose-100 hover:bg-rose-50 hover:border-rose-200 shadow-sm shadow-rose-100"
          }`}
        >
          {isCancelled ? "Cancelled" : "Delete"}
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Booking Delete permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>My Awesome booking</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button
                  onClick={() => onCancelBooking(id)}
                  slot="close"
                  variant="danger"
                >
                  Delete Booking
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default BookingDelete;

"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  FieldError,
  TextField,
  Label,
  Form,
} from "@heroui/react";
import { FaChevronRight } from "react-icons/fa";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { AddFacilityFeature } from "@/lib/data";

const AddFacility = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const facilitiesData = Object.fromEntries(data.entries());

    const allFeatureInfo = {
      ownerEmail: user?.email,
      name: facilitiesData.name,
      sportType: facilitiesData.sportType,
      image: facilitiesData.url,
      location: facilitiesData.location,
      pricePerHour: facilitiesData.price,
      capacity: facilitiesData.capacity,
      description: facilitiesData.description,
      availabilityStatus: "Available",
      timeSlots: facilitiesData.timeSlots,
      createAt: new Date(),
    };

    const res = await AddFacilityFeature(allFeatureInfo)
   

    if (res.insertedId) {
      toast.success("Facility Added Successfully!");
    } else {
      toast.error("Failed toAdd Facility!");
    }

  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation / Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Dashboard</span>
              <FaChevronRight className="text-[10px]" />
              <span className="text-[#163962]">Add Facility</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Create New Sports Facility
            </h1>
          </div>
        </div>
        <Form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <div className="flex w-full gap-8 ">
            <div className="w-full space-y-5 ">
              <div>
                <TextField isRequired name="name" type="text">
                  <Label>Facility Name</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Facility Name"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="facilityType" type="text">
                  <Label>Facility Type</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Facility Type"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="url" type="url">
                  <Label>Image Upload (imgbb/postimage)</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Image Upload"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="location" type="text">
                  <Label>Location</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Location"
                  />
                  <FieldError />
                </TextField>
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <TextField isRequired name="price" type="number">
                  <Label>Price Per Hour</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Price Per Hour"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="capacity" type="number">
                  <Label>Capacity</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Capacity"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="timeSlots" type="text">
                  <Label>Available Time Slots</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter available time slots"
                  />
                  <FieldError />
                </TextField>
              </div>
              <div>
                <TextField isRequired name="description" type="text">
                  <Label>Description</Label>
                  <Input
                    className="w-full rounded-xl"
                    placeholder="Enter Description"
                  />
                  <FieldError />
                </TextField>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Submit
            </Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
          </div>
        </Form>
      </div>

      {/* Main Form Box */}
    </div>
  );
};

export default AddFacility;

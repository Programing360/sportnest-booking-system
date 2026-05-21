"use server";
import { headers } from "next/headers";
import { auth } from "./auth";

export const allFeatureData = async () => {
  const data = await fetch("http://localhost:5000/facilities");
  return data.json();
};

export const featureCardDetails = async (id) => {
  const data = await fetch(`http://localhost:5000/facilities/${id}`);
  return data.json();
};

export const deleteFaclities = async (id) => {

  const res = await fetch(`http://localhost:5000/deleteFacilities/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const bookingFacilities = async (bookingData) => {
  const res = await fetch("http://localhost:5000/bookings", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  return res.json();
};

export const myBookingFacilities = async (userId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`http://localhost:5000/bookings/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const cancelBookingFacilities = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`http://localhost:5000/cancelBooking/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateFacilities = async (formData, id) => {
  const res = await fetch(`http://localhost:5000/updateFacilities/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const result = await res.json();
  return result
};

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

  const res = await fetch(`http://localhost:5000/bookings/${userId}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  });
  return res.json();
};

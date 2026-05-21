"use server";
import { headers } from "next/headers";
import { auth } from "./auth";

export const allFeatureData = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`);
  return data.json();
};

export const featureCardDetails = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/facilities/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return data.json();
};


export const AddFacilityFeature = async (allFeatureInfo) => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allFeatureInfo),
    });
    return res.json();
}

export const deleteFaclities = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/deleteFacilities/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const bookingFacilities = async (bookingData) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const cancelBookingFacilities = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cancelBooking/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const updateFacilities = async (formData, id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/updateFacilities/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}`  },
      body: JSON.stringify(formData),
    },
  );
  const result = await res.json();
  return result;
};

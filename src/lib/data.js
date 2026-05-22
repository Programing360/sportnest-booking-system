"use server";
import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const allFeatureData = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`);
  return data.json();
};

export const featureCardDetails = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    return redirect("/login");
  }
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
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
if (!token) {
    return redirect("/login");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facilities`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(allFeatureInfo),
  });
  return res.json();
};

export const deleteFaclities = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    return redirect("/login");
  }
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
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    return redirect("/login");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const myBookingFacilities = async (userId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return redirect("/login");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${userId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const cancelBookingFacilities = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    return redirect("/login");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cancelBooking/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateFacilities = async (formData, id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    return redirect("/login");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/updateFacilities/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

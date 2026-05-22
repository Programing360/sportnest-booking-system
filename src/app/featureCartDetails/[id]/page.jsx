import CardDetails from "@/component/CardDetails";
import { auth } from "@/lib/auth";
import { featureCardDetails } from "@/lib/data";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const FeatureCartDetails = async ({ params }) => {

  const userSession = await auth.api.getSession({
    headers: await headers()
  })
  if(!userSession){
    return redirect('/login')
  }
  console.log(userSession);

  const { id } = await params;

  const cardDetails = await featureCardDetails(id);

  return (
    <div>
      <CardDetails featureCard={cardDetails}></CardDetails>
    </div>
  );
};

export default FeatureCartDetails;

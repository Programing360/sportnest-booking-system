import CardDetails from "@/component/CardDetails";
import { featureCardDetails } from "@/lib/data";
import React from "react";

const FeatureCartDetails = async ({ params }) => {
  const { id } = await params;

  const cardDetails = await featureCardDetails(id);
  console.log(cardDetails);

  return (
    <div>
      <CardDetails featureCard={cardDetails}></CardDetails>
    </div>
  );
};

export default FeatureCartDetails;

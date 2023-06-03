"use client";

import { useParams } from "next/navigation";

const GatewayDetails = () => {
  const params = useParams();
  console.log("🚀 ~ file: page.tsx:8 ~ Gateway ~ params:", params)

  return <div></div>;
};

export default GatewayDetails;

"use client";

import GatewayDetails from "@/src/components/containers/GatewayDetails";
import Layout from "@/src/components/layout";
import { useParams } from "next/navigation";
import Loading from "../loading";
import { Suspense } from "react";

const GatewayPage = () => {
  const params = useParams();

  return (
    <Layout>
      <GatewayDetails id={params.id} />
    </Layout>
  );
};

export default GatewayPage;

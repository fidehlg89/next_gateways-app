"use client";

import GatewayDetails from "@/src/components/containers/GatewayDetails";
import Layout from "@/src/components/layouts";
import { useParams } from "next/navigation";
import Loading from "../loading";
import { Suspense } from "react";

const GatewayPage = () => {
  const params = useParams();

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {params?.id && <GatewayDetails id={params.id} />}
      </Suspense>
    </Layout>
  );
};

export default GatewayPage;

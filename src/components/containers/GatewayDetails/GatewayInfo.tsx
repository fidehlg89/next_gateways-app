import { Gateway } from "@/src/interfaces";
import React from "react";

type IGatewayInfoProps = {
  gateway: Gateway;
};

const GatewayInfo = ({ gateway }: IGatewayInfoProps) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold leading-5 text-gray-900">
          Gateway Information
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900 text-md">
              Serial Number:
            </dt>
            <dd className="mt-1 leading-6 text-gray-700 text-md sm:col-span-2 sm:mt-0">
              {gateway.serialNumber}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900 text-md">
              Name:
            </dt>
            <dd className="mt-1 leading-6 text-gray-700 text-md sm:col-span-2 sm:mt-0">
              {gateway.name}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900 text-md">
              IP Address:
            </dt>
            <dd className="mt-1 leading-6 text-gray-700 text-md sm:col-span-2 sm:mt-0">
              {gateway.ipAddress}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default GatewayInfo;

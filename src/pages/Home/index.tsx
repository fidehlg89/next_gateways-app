import Link from "next/link";
import React from "react";

const HomePage= () => {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          {`Welcome to Our App!`}
        </h1>
        <p className="mb-12 text-lg text-gray-500">
          {`Ready to manage your gateway information? Let's get started!`}
        </p>
        <Link href="/gateways">
          <span className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
            {`Manage Gateways`}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

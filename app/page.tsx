import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <h2 className="text-center text-gray-500">{`Welcome to our app, ready to add your gateway information. Let's started!`}</h2>
      <div className="flex items-center justify-center px-4 py-12 mx-auto mt-5 max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <Link
          href="/gateways"
          className="block w-1/3 px-5 py-3 text-base font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md lg:inline-block lg:w-auto hover:bg-indigo-700"
        >
          <span>Manage Gateways</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Link from "next/link";
import { ILayoutProps } from "@/src/types";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      {/* Header */}
      <header className="py-4 text-white bg-gray-800">
        {/* Navbar */}
        <nav className="container flex items-center justify-between mx-auto">
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-bold">Home</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto mt-4">{children}</main>
    </div>
  );
};

export default Layout;

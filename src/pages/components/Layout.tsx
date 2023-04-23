import React from "react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex justify-center min-h-screen w-screen bg-gray-900 ">
        <div className="flex flex-col justify-center w-full mt-5 mb-5 bg-gray-900 text-white ">
          <div className="container max-w-[80vw] mx-auto p-4">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import Navigation from "./Navigations/Navigation";
import Footer from "./Footer";

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8fc] text-[#24152d]">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;

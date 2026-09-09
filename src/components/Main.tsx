import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="w-full bg-[#f4f6fa] dark:bg-[#1a0728] text-[#151515] dark:text-[#f4f6fa] overflow-x-hidden transition-colors duration-300">
      {children}
    </main>
  );
};

export default Main;

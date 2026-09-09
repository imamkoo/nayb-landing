import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="w-full bg-[#07090e] text-[#f4f6fa] overflow-x-hidden">
      {children}
    </main>
  );
};

export default Main;

import React from "react";
import Banner from "../components/ui/Banner";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout(MainLayoutProps: MainLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-start h-screen bg-base-300">
      {/* Banner */}
      <Banner />
      {MainLayoutProps.children}
    </div>
  );
}

export default MainLayout;

"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col justify-between w-full h-screen">
      <Navbar />
      <div className="content-wrapper">
        <div className="min-h-[calc(100vh-200px)]" id="content">
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Template;

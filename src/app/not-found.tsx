"use client";

import { Button } from "@/components/ui/HeroUI";
import { useRouter } from "next/navigation";
import { FaAnglesLeft } from "react-icons/fa6";
import Image from "next/image";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="relative w-full h-full">
        <Image
          src="/bg-notfound.jpg"
          alt="bg"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute w-full h-full bg-black/60"></div>
      </div>
      <div className="absolute top-[25%] sm:top-[30%] w-full md:px-0 px-6 text-white">
        <div className="relative flex flex-col w-full h-full">
          <div className="relative">
            <div className="absolute top-[50%] md:translate-y-[-50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
              <div className="relative size-[150px] md:size-[225px] z-10">
                <Image
                  src="/bidan_delima.png"
                  alt="404"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <p className="text-[8rem] sm:text-[12rem] font-bold tracking-widest">
              4&nbsp;&nbsp; 4
            </p>
          </div>
          <div className="absolute flex flex-col items-center w-full md:bottom-[15%] bottom-[10%] translate-y-[100%]">
            <h1 className="text-xl sm:text-3xl font-bold tracking-wide">
              Oops! Halaman Tidak Ditemukan
            </h1>
            <p className="text-xs sm:text-sm max-w-sm mx-auto">
              Maaf, halaman yang kamu cari tidak ditemukan. Silakan coba lagi.
            </p>
            <div className="pt-4">
              <Button
                variant="shadow"
                color="primary"
                startContent={<FaAnglesLeft className="animate-pulse" />}
                className="px-8 py-2 font-semibold tracking-wide uppercase"
                onPress={() => router.back()}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

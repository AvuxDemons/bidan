import { metadataConfig } from "@/app/config";
import { Divider, Image } from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="relative bg-default-100 text-default-900">
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="py-3 w-full mx-auto flex flex-row justify-center items-center gap-2 sm:gap-8 font-medium text-xs sm:text-[0.85rem] text-white bg-gradient-to-r from-primary/50 to-primary/50 via-primary sm:from-transparent sm:to-transparent sm:via-primary">
          <Link
            target="_blank"
            href={"/"}
            className="flex flex-row items-center gap-1 hover:scale-110 transition duration-300"
          >
            <FaMapMarkerAlt />
            <p>Surabaya</p>
          </Link>
          <Link
            target="_blank"
            href={"https://www.instagram.com/bidan_delima/"}
            className="flex flex-row items-center gap-1 hover:scale-110 transition duration-300"
          >
            <FaInstagram />
            <p>{metadataConfig.name}</p>
          </Link>
          <Link
            target="_blank"
            href={
              "https://wa.me/08111111111?text=TUNG TUNG TUNG TUNG TUNG TUNG SAHUR!!!"
            }
            className="flex flex-row items-center gap-1 hover:scale-110 transition duration-300"
          >
            <FaWhatsapp />
            <p>Whatsapp</p>
          </Link>
        </div>
        <div className="pt-6 pb-10 sm:pb-8 flex flex-row gap-5 items-center">
          <Image src={"bidan_delima.png"} alt="logo" width={50} height={50} />
          <Divider className="hidden sm:block h-6" orientation="vertical" />
          <div className="flex flex-col text-xs">
            <p className="font-medium tracking-wide">
              &copy; {metadataConfig.name} 2025.
            </p>
            <p className="text-default-700">
              Made with <span className="text-primary">❤</span> by{" "}
              <Link
                href={metadataConfig.publisher.url}
                target="_blank"
                className="text-default-900 hover:text-focus transition duration-300"
              >
                {metadataConfig.publisher.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

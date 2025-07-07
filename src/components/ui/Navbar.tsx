import { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Image,
} from "@heroui/react";
import { Button } from "@/components/ui/HeroUI";
import { UserDropdown } from "@/components/ui/User";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Theme from "@/components/ui/Theme";
import { useTheme } from "next-themes";
// import EngageSpotNotification from "@/components/ui/Notification";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <HeroUINavbar
      isBordered
      className="border-b-default-300"
      classNames={{ wrapper: "content-wrapper" }}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image src={"bidan_delima.png"} alt="logo" width={45} height={45} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        as="div"
        className="items-center gap-1 md:gap-2"
        justify="end"
      >
        {session ? (
          <>
            {/* <EngageSpotNotification /> */}
            <UserDropdown session={session} />
          </>
        ) : (
          <>
            <Theme />
            <Button
              color="primary"
              aria-label="Login"
              onPress={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;

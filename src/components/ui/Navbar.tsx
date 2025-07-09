import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  Image,
} from "@heroui/react";
import { Button } from "@/components/ui/HeroUI";
import { UserDropdown } from "@/components/ui/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Theme from "@/components/ui/Theme";
import Link from "next/link";
// import EngageSpotNotification from "@/components/ui/Notification";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <HeroUINavbar
      isBordered
      className="border-b-default-300"
      classNames={{ wrapper: "content-wrapper" }}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image
            src={"logo.png"}
            alt="logo"
            width={45}
            height={45}
            className="rounded-lg"
          />
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
            <Link href="/auth/login">
              <Button color="primary" aria-label="Login">
                Login
              </Button>
            </Link>
          </>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;

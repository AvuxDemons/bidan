import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Skeleton,
  User,
} from "@heroui/react";
import { FaHeart, FaUser } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoBagHandle } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { metadataConfig } from "@/app/config";

export const UserDropdown = ({
  session,
  fullWidth = false,
}: {
  session: any;
  fullWidth?: boolean;
}) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Dropdown showArrow radius="sm" closeOnSelect={false}>
      <DropdownTrigger className="flex items-center justify-center">
        <div
          className={`flex justify-start items-center cursor-pointer hover:opacity-75 ${
            fullWidth && "w-full"
          }`}
        >
          {fullWidth ? (
            <User
              name={
                session?.user.name ? (
                  session?.user.name
                ) : (
                  <Skeleton className="h-4 w-24" />
                )
              }
              description={
                session?.user.email ? (
                  session?.user.email
                ) : (
                  <Skeleton className="h-4 w-24" />
                )
              }
              avatarProps={{
                src: session?.user.image || "",
                className: "ml-2 sm:ml-0",
              }}
              classNames={{
                wrapper: "gap-0",
                description: "text-xs",
              }}
            />
          ) : (
            <Avatar
              src={session?.user.image || ""}
              alt={session?.user.name || ""}
            />
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User menu"
        className="px-3"
        color="primary"
        variant="flat"
        disabledKeys={["user"]}
      >
        {
          <DropdownSection
            aria-label="User"
            showDivider
            classNames={{ divider: "bg-default-200 h-[1px]" }}
          >
            <DropdownItem
              isReadOnly
              key="user"
              className="h-14 gap-2 opacity-100"
              classNames={{ base: "px-0" }}
            >
              <User
                name={
                  session?.user.name ? (
                    session?.user.name
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )
                }
                description={
                  session?.user.email ? (
                    session?.user.email
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )
                }
                avatarProps={{
                  size: "sm",
                  src: session?.user.image || "",
                }}
              />
            </DropdownItem>
            <DropdownItem
              key="profile"
              startContent={<FaUser />}
              onPress={() => router.push("/profile")}
            >
              Profile
            </DropdownItem>
            {/* <DropdownItem
              key="wishlist"
              startContent={<FaHeart />}
              onPress={() => router.push("/wishlist")}
            >
              Wishlist
            </DropdownItem>
            <DropdownItem
              key="pesanan_saya"
              startContent={<IoBagHandle />}
              onPress={() => router.push("/order")}
            >
              Pesanan Saya
            </DropdownItem> */}
          </DropdownSection>
        }
        <DropdownSection
          aria-label="General"
          showDivider
          classNames={{ divider: "bg-default-200 h-[2px]" }}
        >
          <DropdownItem
            onPress={() => changeTheme()}
            key="theme"
            endContent={
              theme === "light" ? (
                <MdWbSunny className="text-primary" size={18} />
              ) : (
                <BsMoonStarsFill className="text-primary" size={18} />
              )
            }
          >
            Tema
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Support">
          <DropdownItem
            key="help_and_feedback"
            startContent={<FaPhoneAlt />}
            onPress={() =>
              router.push(
                `https://wa.me/${metadataConfig.contact.whatsapp}?text=Halo admin, saya ingin bertanya tentang layanan ${metadataConfig.name}`
              )
            }
          >
            Help & Feedback
          </DropdownItem>
          {session && (
            <DropdownItem
              key="logout"
              startContent={<FaSignOutAlt />}
              onPress={() => signOut()}
            >
              Log Out
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

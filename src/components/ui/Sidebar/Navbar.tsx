import { Button } from "@/components/ui/HeroUI";
import { Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";
import { IoMdExit } from "react-icons/io";
// import EngageSpotNotification from "@/components/ui/Notification";

const SidebarNavbar = ({
  collapsed,
  toggled,
  broken,
  setCollapsed,
  setToggled,
}: {
  collapsed: boolean;
  toggled: boolean;
  broken: boolean;
  setCollapsed: () => void;
  setToggled: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between bg-default-200 p-2">
      <div className="flex flex-row gap-2">
        {!broken && (
          <Button variant="light" isIconOnly onPress={setCollapsed}>
            {collapsed ? (
              <TbLayoutSidebarLeftExpandFilled size={20} />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled size={20} />
            )}
          </Button>
        )}
        {broken && (
          <Button variant="light" isIconOnly onPress={setToggled}>
            {toggled ? (
              <TbLayoutSidebarLeftExpandFilled size={20} />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled size={20} />
            )}
          </Button>
        )}
      </div>
      <div className="flex flex-row gap-1">
        {/* <EngageSpotNotification /> */}
        <Tooltip content="Exit Admin Panel" radius="sm">
          <Button
            variant="light"
            endContent={<IoMdExit size={20} />}
            onPress={() => router.push("/")}
          >
            Keluar
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SidebarNavbar;

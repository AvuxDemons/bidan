import { Tooltip } from "@heroui/react";
import { MenuItem } from "react-pro-sidebar";
import type { SidebarItem as SidebarItemType } from "./Data";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <Tooltip
      isDisabled={!collapsed}
      className="capitalize"
      content={item.tooltip || item.label}
      radius="sm"
      size="sm"
      placement="right"
      classNames={{
        content: "bg-primary-500 text-white",
      }}
    >
      <MenuItem
        href={item.href}
        icon={<Icon />}
        rootStyles={{
          fontSize: "0.925rem",
        }}
      >
        {item.label}
      </MenuItem>
    </Tooltip>
  );
};

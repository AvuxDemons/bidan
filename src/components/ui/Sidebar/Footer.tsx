import { UserDropdown } from "../User";
import { useSession } from "next-auth/react";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  collapsed,
  ...rest
}) => {
  const { data: session } = useSession();
  return (
    <div {...rest}>
      <UserDropdown session={session} fullWidth={!collapsed} />
    </div>
  );
};

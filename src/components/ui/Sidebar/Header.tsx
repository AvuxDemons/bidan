import { metadataConfig } from "@/app/config";
import Image from "next/image";
import React from "react";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapse?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  collapse,
  ...rest
}) => {
  return (
    <div {...rest}>
      <div className="px-6 py-8 flex flex-row gap-2">
        <Image
          src={"logo.png"}
          alt="logo"
          width={40}
          height={40}
          className="rounded-xl"
        />
        {!collapse && (
          <div className="flex flex-col">
            <p className="font-bold tracking-wide uppercase text-primary">
              {metadataConfig.name}
            </p>
            <p className="font-medium text-xs text-default-800">WeebDevID</p>
          </div>
        )}
      </div>
    </div>
  );
};

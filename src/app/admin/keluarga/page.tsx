"use client";
import { Tabs, Tab } from "@heroui/react";
import Keluarga from "./_components/Keluarga";
import Anak from "./_components/Anak";
import Ayah from "./_components/Ayah";
import Bunda from "./_components/Bunda";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <Tabs
        classNames={{
          tabList: "rounded-[8px]",
          cursor: "rounded-[8px]",
          tabContent:
            "group-data-[selected=true]:text-white text-default-600 font-medium",
          panel: "px-0",
        }}
        color="primary"
        aria-label="Options"
      >
        <Tab key="keluarga" title="Keluarga">
          <Keluarga />
        </Tab>
        <Tab key="bunda" title="Bunda">
          <Bunda />
        </Tab>
        <Tab key="ayah" title="Ayah">
          <Ayah />
        </Tab>
        <Tab key="anak" title="Anak">
          <Anak />
        </Tab>
      </Tabs>
    </div>
  );
};

export default page;

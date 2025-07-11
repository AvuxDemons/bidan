"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/HeroUI";
import { MdChevronRight } from "react-icons/md";
import { metadataConfig } from "@/app/config";
import { useEffect, useState } from "react";
import { service_category } from "@/types/data";
import { useLayanan } from "@/hooks/useLayanan";
import { FaAngleLeft } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Layanan from "./_components/Layanan";

const Page = () => {
  const router = useRouter();
  const { layananList } = useLayanan();
  const [selectedLayanan, setSelectedLayanan] = useState<string | null>(null);
  const [layananListFiltered, setLayananListFiltered] = useState<Layanan[]>([]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    if (selectedLayanan) {
      const filteredLayanan = layananList.filter(
        (layanan) => layanan.jenis === selectedLayanan
      );
      setLayananListFiltered(filteredLayanan);
    }
  }, [selectedLayanan]);

  const categoryVariants = {
    initial: ({
      direction,
      visited,
    }: {
      direction: "forward" | "backward";
      visited: boolean;
    }) =>
      !visited
        ? { opacity: 0, y: 25 }
        : direction === "backward"
        ? { opacity: 0, x: -25 }
        : { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: ({ direction }: { direction: "forward" | "backward" }) =>
      direction === "forward" ? { opacity: 0, x: -25 } : { opacity: 0, x: 25 },
  };

  const layananVariants = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 25 },
  };

  const titleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] md:min-h-[80vh] py-8">
      <Section className="flex flex-col justify-between items-center gap-8 min-h-[70vh] w-full md:max-w-xl p-6 md:px-16 md:pt-16 md:pb-8 overflow-hidden">
        <div className="text-center">
          <AnimatePresence mode="wait">
            {selectedLayanan ? (
              <motion.h1
                key="layanan-title"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold tracking-widest uppercase"
              >
                Layanan {selectedLayanan}
              </motion.h1>
            ) : (
              <motion.h1
                key="category-title"
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold tracking-widest uppercase"
              >
                Pilih Layanan
              </motion.h1>
            )}
          </AnimatePresence>
          <p className="text-xs md:text-sm text-default-800">
            Berikut merupakan Layanan yang tersedia di&nbsp;
            <span className="text-primary">{metadataConfig.name}</span>
            <br />
            Silahkan pilih layanan yang Anda inginkan
          </p>
        </div>

        <AnimatePresence
          mode="wait"
          custom={{ direction, visited: hasVisited }}
        >
          {!selectedLayanan ? (
            <motion.div
              key="category-view"
              custom={{ direction, visited: hasVisited }}
              variants={categoryVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full grid grid-cols-1 gap-4"
            >
              {service_category.map((category, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 md:p-6 rounded-xl border-2 border-default-500 shadow-md hover:shadow-lg hover:border-primary hover:scale-105 transition cursor-pointer"
                  onClick={() => {
                    setDirection("forward");
                    setHasVisited(true);
                    setSelectedLayanan(category.value);
                  }}
                >
                  <div className="flex flex-col">
                    <h3 className="text-base md:text-lg font-semibold group-hover:text-primary transition capitalize">
                      {category.label}
                    </h3>
                    <p className="text-xs md:text-sm">{category.description}</p>
                  </div>
                  <MdChevronRight
                    className="group-hover:text-primary group-hover:translate-x-2 transition"
                    size={24}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="layanan-view"
              variants={layananVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full grid grid-cols-1 gap-4"
            >
              <Layanan layanan={layananListFiltered} />
              <Button
                size="lg"
                variant="shadow"
                onPress={() => {
                  setDirection("backward");
                  setSelectedLayanan(null);
                }}
                startContent={
                  <FaAngleLeft className="group-hover:-translate-x-1 transition" />
                }
              >
                Kembali
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center text-xs md:text-sm text-center">
          <div className="flex flex-wrap gap-2">
            <p>Butuh bantuan ?</p>
            <Link
              target="_blank"
              className="text-primary underline hover:text-foreground transition"
              href={`https://wa.me/${metadataConfig.contact.whatsapp}?text=Halo admin, saya butuh bantuan.`}
            >
              Hubungi Kami
            </Link>
          </div>
          <p>Kami siap membantu anda kapanpun 🤗</p>
        </div>
      </Section>
    </div>
  );
};

export default Page;

"use client";

import Image from "next/image";
import Link from "next/link";
import Theme from "@/components/ui/Theme";
import { Button } from "@/components/ui/HeroUI";
import { signIn } from "next-auth/react";
import { metadataConfig } from "@/app/config";

const Page = () => {
  return (
    <>
      <div className="relative h-svh flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <Theme />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div>
            <div className="absolute inset-0 bg-gradient-to-bl from-zinc-900/80 via-gray-50/0 to-zinc-900/80 z-[2] h-full"></div>
            <Image
              src="/login.jpg"
              fill
              alt="Background Image"
              className="absolute inset-0"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="relative">
              <Image
                src="/full_bidan_delima.png"
                alt="Logo"
                width={120}
                height={120}
                className="rounded-3xl"
              />
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p
                className="text-lg"
                style={{ textShadow: "0px 2px 2px rgba(0,0,0,0.6)" }}
              >
                &ldquo;Setiap tangisan pertama adalah awal dari harapan. Bagi
                kami, melayani ibu dan buah hati adalah bentuk cinta yang tak
                ternilai.&rdquo;
              </p>
              <footer className="text-sm">
                In Frame{" "}
                <Link
                  target="_blank"
                  className="underline"
                  href={metadataConfig.contact.instagram}
                >
                  @{metadataConfig.contact.instagram.split("instagram.com/")[1]}
                </Link>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="p-4">
          <div className="mx-auto flex w-full flex-col justify-center items-center space-y-12 sm:w-[350px]">
            <div className="flex flex-col justify-center items-center gap-8 text-center">
              <div className="relative size-[180px] md:size-[200px]">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="rounded-3xl"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tighter">
                  Selamat Datang Di{" "}
                  <span className="font-bold bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                    {metadataConfig.name}
                  </span>
                </h1>
                <p className="text-sm">
                  Penyedia layanan kesehatan terpercaya <br /> untuk keluarga
                  kecil anda 💖
                </p>
              </div>
            </div>
            <div className="flex justify-center w-[80%]">
              <Button
                startContent={
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                }
                fullWidth
                variant="shadow"
                color="primary"
                onPress={() => signIn("google", { callbackUrl: "/" })}
              >
                Masuk dengan Google
              </Button>
            </div>
            <div className="flex flex-col items-center text-muted-foreground">
              <p className="text-center text-sm">
                Privasi dan Keamanan data Anda akan terjamin.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <p>Butuh bantuan untuk masuk ?</p>
                <Link
                  target="_blank"
                  className="text-primary underline hover:text-foreground transition"
                  href={`https://wa.me/${metadataConfig.contact.whatsapp}?text=Halo admin, saya butuh bantuan untuk masuk.`}
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

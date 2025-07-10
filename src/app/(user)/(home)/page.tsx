
"use client";

import { MdFamilyRestroom } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKeluarga } from "@/hooks/useKeluarga";
import { createKeluarga } from "@/database/keluarga";
import { updateUser } from "@/database/user";
import { z } from "zod";
import { Button, Input, InputError, Modal } from "@/components/ui/HeroUI";
import { Section } from "@/components/ui/Section";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";

const Page = () => {
  const [noKK, setNoKK] = useState("");
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession();
  const { keluargaList, error: fetchError } = useKeluarga();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      console.log(session.user);
    }
  }, [fetchError]);

  const noKKSchema = z
    .string()
    .min(1, { message: "Nomor KK harus diisi" })
    .refine((val) => /^\d+$/.test(val), {
      message: "Input harus angka",
    })
    .refine((val) => val.length === 16, {
      message: "Nomor KK harus terdiri dari 16 digit angka.",
    });

  const handleSubmit = async () => {
    const keluarga = keluargaList.find((item) => item.no_kk === noKK);

    if (keluarga) {
      await updateUser(session?.user?.id as string, {
        keluargaId: keluarga.id,
      });
      router.push(`/user/keluarga/${keluarga.id}`);
    } else {
      onOpenChange();
      setShowConfirm(true);
    }
  };

  const handleRegisterKeluarga = async () => {
    if (!session?.user) {
      setRegisterError("User not authenticated");
      return;
    }

    setIsRegistering(true);
    setRegisterError(null);

    try {
      const existingFamily = keluargaList.find((item) => item.no_kk === noKK);
      const keluargaId =
        existingFamily?.id ||
        (await createKeluarga({
          no_kk: noKK,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      try {
        if (!session.user.id) {
          throw new Error("User ID not found in session");
        }
        await updateUser(session.user.id, { keluargaId });
        router.push(`/user/keluarga/${keluargaId}`);
      } catch (error) {
        throw new Error("Failed to update user record");
      }
    } catch (error) {
      setRegisterError(
        error instanceof Error
          ? error.message
          : "Gagal mendaftarkan keluarga. Silahkan coba lagi."
      );
      console.error("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Section className="flex flex-col justify-center items-center gap-8 max-w-xl p-6 md:p-16">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase">
          Keluarga
        </h1>

        <div className="size-28 sm:size-32 rounded-full flex items-center justify-center shadow-sm bg-primary/20">
          <MdFamilyRestroom className="text-primary w-14 h-14 sm:w-16 sm:h-16" />
        </div>

        {showConfirm ? (
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-lg font-semibold">
                Konfirmasi Nomor Kartu Keluarga
              </h2>
              <p className="text-[0.85rem] text-default-800">
                Nomor Kartu Keluarga <span className="font-medium">{noKK}</span>{" "}
                tidak ditemukan dalam sistem. Apakah anda ingin{" "}
                <span className="font-semibold tracking-wide text-primary">
                  Mendaftarkan
                </span>{" "}
                Nomor Keluarga Ini ?
              </p>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                fullWidth
                variant="shadow"
                color="success"
                onPress={handleRegisterKeluarga}
              >
                Ya
              </Button>
              <Button fullWidth variant="shadow">
                Tidak
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="flex flex-col justify-center items-center text-center">
              <h2>Masukkan Nomor Kartu Keluarga</h2>
              <p className="text-[0.85rem] text-default-800">
                Silahkan masukkan Nomor Kartu Keluarga Anda, untuk dapat
                melanjutkan proses selanjutnya
              </p>
            </div>

            <div className="space-y-4 w-full">
              <Input
                type="text"
                id="nokk"
                name="nokk"
                placeholder="Nomor Kartu Keluarga"
                isInvalid={errors.length > 0}
                onValueChange={(value) => {
                  setNoKK(value);
                  const validation = noKKSchema.safeParse(value);
                  if (!validation.success) {
                    setErrors(validation.error.errors);
                    return;
                  }
                  setErrors([]);
                }}
                errorMessage={<InputError error={errors} />}
              />

              {fetchError && (
                <div className="text-sm text-red-500 text-center">
                  {fetchError.message}
                </div>
              )}

              <Button
                fullWidth
                isDisabled={noKK.trim().length === 0 || errors.length > 0}
                variant="shadow"
                color="primary"
                onPress={onOpenChange}
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        )}

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Konfirmasi
                </ModalHeader>
                <ModalBody>
                  <p>Apakah Nomor Kartu Keluarga Sudah benar ?</p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Belum</Button>
                  <Button
                    color="primary"
                    isLoading={isRegistering}
                    onPress={handleSubmit}
                  >
                    Ya
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Section>
    </div>
  );
};

export default Page;

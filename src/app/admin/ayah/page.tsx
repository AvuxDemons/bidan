"use client";

import { createAyah, updateAyah, deleteAyah } from "@/database/ayah";
import {
  Button,
  Modal,
  Input,
  Alert,
  Card,
  ModalBody,
  useDisclosure,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useAyahAdmin } from "@/hooks/useAyahAdmin";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AyahAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [formData, setFormData] = useState<Partial<Ayah>>({
    nik: "",
    nama_lengkap: "",
    ttl: "",
    golongan_darah: null,
    agama: "Islam",
    no_telepon: "",
    pekerjaan: "",
    pendidikan_terakhir: "",
    alamat: "",
    keterangan: "",
  });

  const { ayahList, error: fetchError } = useAyahAdmin();
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Ayah>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentAyah?.id) {
        await updateAyah(currentAyah.id, formData);
      } else {
        await createAyah(formData);
      }
      setFormData({
        nik: "",
        nama_lengkap: "",
        ttl: "",
        golongan_darah: null,
        agama: "Islam",
        no_telepon: "",
        pekerjaan: "",
        pendidikan_terakhir: "",
        alamat: "",
        keterangan: "",
      });
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ayah: Ayah) => {
    setCurrentAyah(ayah);
    setFormData({
      nik: ayah.nik,
      nama_lengkap: ayah.nama_lengkap,
      ttl: ayah.ttl,
      golongan_darah: ayah.golongan_darah,
      agama: ayah.agama,
      no_telepon: ayah.no_telepon,
      pekerjaan: ayah.pekerjaan,
      pendidikan_terakhir: ayah.pendidikan_terakhir,
      alamat: ayah.alamat,
      keterangan: ayah.keterangan,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ayah?")) {
      try {
        setLoading(true);
        await deleteAyah(id);
        setMutationError(null);
      } catch (err) {
        setMutationError(err as Error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ayah Management</h1>
        <Button onPress={() => onOpen()}>Add New Ayah</Button>
      </div>

      {(fetchError || mutationError) && (
        <Alert variant="solid" color="danger">
          {fetchError?.message || mutationError?.message}
        </Alert>
      )}

      <div className={loading ? "opacity-70" : ""}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Nama</th>
              <th className="text-left p-2">NIK</th>
              <th className="text-left p-2">Updated At</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ayahList.map((ayah: Ayah) => (
              <tr key={ayah.id} className="border-t">
                <td className="p-2">{ayah.nama_lengkap}</td>
                <td className="p-2">{ayah.nik}</td>
                <td className="p-2">{ayah.updatedAt?.toLocaleString()}</td>
                <td className="p-2">{ayah.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(ayah)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(ayah.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentAyah?.id ? "Edit Ayah" : "Add New Ayah"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      label="NIK"
                      name="nik"
                      value={formData.nik || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Nama Lengkap"
                      name="nama_lengkap"
                      value={formData.nama_lengkap || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="TTL"
                      name="ttl"
                      value={formData.ttl || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Golongan Darah"
                      name="golongan_darah"
                      value={formData.golongan_darah || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Agama"
                      name="agama"
                      value={formData.agama || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="No Telepon"
                      name="no_telepon"
                      value={formData.no_telepon || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Pekerjaan"
                      name="pekerjaan"
                      value={formData.pekerjaan || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Pendidikan Terakhir"
                      name="pendidikan_terakhir"
                      value={formData.pendidikan_terakhir || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Alamat"
                      name="alamat"
                      value={formData.alamat || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Keterangan"
                      name="keterangan"
                      value={formData.keterangan || ""}
                      onChange={handleInputChange}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {currentAyah ? "Update" : "Create"}
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}

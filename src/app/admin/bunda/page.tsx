"use client";

import { createBunda, updateBunda, deleteBunda } from "@/database/bunda";
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
import { useBundaAdmin } from "@/hooks/useBundaAdmin";
import { ChangeEvent, FormEvent, useState } from "react";

export default function BundaAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentBunda, setCurrentBunda] = useState<Bunda | null>(null);
  const [formData, setFormData] = useState<Partial<Bunda>>({
    nik: "",
    nama_lengkap: "",
    ttl: "",
    golongan_darah: null,
    agama: "Islam",
    no_telepon: "",
    pekerjaan: "",
    pendidikan_terakhir: "",
    bpjs: "",
    nama_ibu_kandung: "",
    keluarga_id: "",
    ayah_id: "",
  });

  const { bundaList, error: fetchError } = useBundaAdmin();
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Bunda>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentBunda?.id) {
        await updateBunda(currentBunda.id, formData);
      } else {
        await createBunda(formData);
      }
      onOpenChange();
      setFormData({
        nik: "",
        nama_lengkap: "",
        ttl: "",
        golongan_darah: null,
        agama: "Islam",
        no_telepon: "",
        pekerjaan: "",
        pendidikan_terakhir: "",
        bpjs: "",
        nama_ibu_kandung: "",
        keluarga_id: "",
        ayah_id: "",
      });
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bunda: Bunda) => {
    setCurrentBunda(bunda);
    setFormData({
      nik: bunda.nik,
      nama_lengkap: bunda.nama_lengkap,
      ttl: bunda.ttl,
      golongan_darah: bunda.golongan_darah,
      agama: bunda.agama,
      no_telepon: bunda.no_telepon,
      pekerjaan: bunda.pekerjaan,
      pendidikan_terakhir: bunda.pendidikan_terakhir,
      bpjs: bunda.bpjs,
      nama_ibu_kandung: bunda.nama_ibu_kandung,
      keluarga_id: bunda.keluarga_id,
      ayah_id: bunda.ayah_id,
    });
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bunda?")) {
      try {
        setLoading(true);
        await deleteBunda(id);
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
        <h1 className="text-2xl font-bold">Bunda Management</h1>
        <Button onPress={onOpen}>Add New Bunda</Button>
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
            {bundaList.map((bunda: Bunda) => (
              <tr key={bunda.id} className="border-t">
                <td className="p-2">{bunda.nama_lengkap}</td>
                <td className="p-2">{bunda.nik}</td>
                <td className="p-2">{bunda.updatedAt?.toLocaleString()}</td>
                <td className="p-2">{bunda.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(bunda)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(bunda.id)}
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
                {currentBunda?.id ? "Edit Bunda" : "Add New Bunda"}
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
                      label="BPJS"
                      name="bpjs"
                      value={formData.bpjs || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Nama Ibu Kandung"
                      name="nama_ibu_kandung"
                      value={formData.nama_ibu_kandung || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Keluarga ID"
                      name="keluarga_id"
                      value={formData.keluarga_id || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Ayah ID"
                      name="ayah_id"
                      value={formData.ayah_id || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {currentBunda ? "Update" : "Create"}
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

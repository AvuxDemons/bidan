"use client";

import { createAnak, updateAnak, deleteAnak } from "@/database/anak";
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
import { useAnakAdmin } from "@/hooks/useAnakAdmin";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AnakAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentAnak, setCurrentAnak] = useState<Anak | null>(null);
  const [formData, setFormData] = useState<Partial<Anak>>({
    nik: "",
    nama_lengkap: "",
    ttl: "",
    golongan_darah: null,
    jenis_kelamin: null,
    anak_ke: 1,
    bpjs: "",
    keterangan: "",
    keluarga_id: "",
    ayah_id: "",
  });

  const { anakList, error: fetchError } = useAnakAdmin();
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Anak>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentAnak?.id) {
        await updateAnak(currentAnak.id, formData);
      } else {
        await createAnak(formData);
      }
      onOpenChange();
      setFormData({
        nik: "",
        nama_lengkap: "",
        ttl: "",
        golongan_darah: null,
        jenis_kelamin: null,
        anak_ke: 1,
        bpjs: "",
        keterangan: "",
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

  const handleEdit = (anak: Anak) => {
    setCurrentAnak(anak);
    setFormData({
      nik: anak.nik,
      nama_lengkap: anak.nama_lengkap,
      ttl: anak.ttl,
      golongan_darah: anak.golongan_darah,
      jenis_kelamin: anak.jenis_kelamin,
      anak_ke: anak.anak_ke,
      bpjs: anak.bpjs,
      keterangan: anak.keterangan,
      keluarga_id: anak.keluarga_id,
      ayah_id: anak.ayah_id,
    });
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this anak?")) {
      try {
        setLoading(true);
        await deleteAnak(id);
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
        <h1 className="text-2xl font-bold">Anak Management</h1>
        <Button onPress={onOpen}>Add New Anak</Button>
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
              <th className="text-left p-2">Jenis Kelamin</th>
              <th className="text-left p-2">Anak Ke</th>
              <th className="text-left p-2">Updated At</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {anakList.map((anak: Anak) => (
              <tr key={anak.id} className="border-t">
                <td className="p-2">{anak.nama_lengkap}</td>
                <td className="p-2">{anak.nik}</td>
                <td className="p-2">{anak.jenis_kelamin}</td>
                <td className="p-2">{anak.anak_ke}</td>
                <td className="p-2">{anak.updatedAt?.toLocaleString()}</td>
                <td className="p-2">{anak.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(anak)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(anak.id)}
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
                {currentAnak?.id ? "Edit Anak" : "Add New Anak"}
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
                      label="Jenis Kelamin"
                      name="jenis_kelamin"
                      value={formData.jenis_kelamin || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Anak Ke"
                      name="anak_ke"
                      type="number"
                      value={formData.anak_ke?.toString() || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="BPJS"
                      name="bpjs"
                      value={formData.bpjs || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Keterangan"
                      name="keterangan"
                      value={formData.keterangan || ""}
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
                        {currentAnak ? "Update" : "Create"}
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

"use client";

import {
  createLayanan,
  updateLayanan,
  deleteLayanan,
} from "@/database/layanan";
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
  Select,
  SelectItem
} from "@heroui/react";
import { useLayanan } from "@/hooks/useLayanan";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LayananAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentLayanan, setCurrentLayanan] = useState<Layanan | null>(null);
  const [formData, setFormData] = useState<Partial<Layanan>>({
    nama: "",
    jenis: "",
    deskripsi: "",
    harga: 0
  });

  const { layananList, error: fetchError } = useLayanan();
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Layanan>) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev: Partial<Layanan>) => ({ ...prev, jenis: value as 'ibu' | 'anak' | 'umum' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentLayanan?.id) {
        await updateLayanan(currentLayanan.id, formData);
      } else {
        await createLayanan(formData);
      }
      onOpenChange();
      setFormData({ nama: "", jenis: "", deskripsi: "", harga: 0 });
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (layanan: Layanan) => {
    setCurrentLayanan(layanan);
    setFormData({
      nama: layanan.nama,
      jenis: layanan.jenis,
      deskripsi: layanan.deskripsi || "",
      harga: layanan.harga || 0
    });
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus layanan ini?")) {
      try {
        setLoading(true);
        await deleteLayanan(id);
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
        <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
        <Button onPress={onOpen}>Tambah Layanan Baru</Button>
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
              <th className="text-left p-2">Nama Layanan</th>
              <th className="text-left p-2">Jenis</th>
              <th className="text-left p-2">Harga</th>
              <th className="text-left p-2">Updated At</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {layananList.map((layanan: Layanan) => (
              <tr key={layanan.id} className="border-t">
                <td className="p-2">{layanan.nama}</td>
                <td className="p-2">{layanan.jenis}</td>
                <td className="p-2">{layanan.harga?.toLocaleString('id-ID')}</td>
                <td className="p-2">{layanan.updatedAt?.toLocaleString()}</td>
                <td className="p-2">{layanan.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(layanan)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(layanan.id)}
                    >
                      Hapus
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
                {currentLayanan?.id ? "Edit Layanan" : "Tambah Layanan Baru"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      label="Nama Layanan"
                      name="nama"
                      value={formData.nama || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <Select
                      label="Jenis Layanan"
                      selectedKeys={[formData.jenis || ""]}
                      onChange={(e) => handleSelectChange(e as ChangeEvent<HTMLSelectElement>)}
                    >
                      <SelectItem key="ibu">Ibu</SelectItem>
                      <SelectItem key="anak">Anak</SelectItem>
                      <SelectItem key="umum">Umum</SelectItem>
                    </Select>
                    <Input
                      label="Deskripsi"
                      name="deskripsi"
                      value={formData.deskripsi || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Harga"
                      name="harga"
                      type="number"
                      value={formData.harga?.toString() || "0"}
                      onChange={handleInputChange}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="light" onPress={onClose}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {currentLayanan ? "Update" : "Simpan"}
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

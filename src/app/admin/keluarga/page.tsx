"use client";

import {
  createKeluarga,
  updateKeluarga,
  deleteKeluarga,
} from "@/database/keluarga";
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
import { useKeluarga } from "@/hooks/useKeluarga";
import { ChangeEvent, FormEvent, useState } from "react";

export default function KeluargaAdminPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentKeluarga, setCurrentKeluarga] = useState<Keluarga | null>(null);
  const [formData, setFormData] = useState<Partial<Keluarga>>({
    no_kk: "",
  });

  const { keluargaList, error: fetchError } = useKeluarga();
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState<Error | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Keluarga>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentKeluarga?.id) {
        await updateKeluarga(currentKeluarga.id, formData);
      } else {
        await createKeluarga(formData);
      }
      onOpenChange();
      setFormData({ no_kk: "" });
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (keluarga: Keluarga) => {
    setCurrentKeluarga(keluarga);
    setFormData({
      no_kk: keluarga.no_kk,
    });
    onOpen();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this keluarga?")) {
      try {
        setLoading(true);
        await deleteKeluarga(id);
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
        <h1 className="text-2xl font-bold">Keluarga Management</h1>
        <Button onPress={onOpen}>Add New Keluarga</Button>
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
              <th className="text-left p-2">Nama Keluarga</th>
              <th className="text-left p-2">Updated At</th>
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keluargaList.map((keluarga: Keluarga) => (
              <tr key={keluarga.id} className="border-t">
                <td className="p-2">{keluarga.no_kk}</td>
                <td className="p-2">{keluarga.updatedAt?.toLocaleString()}</td>
                <td className="p-2">{keluarga.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onPress={() => handleEdit(keluarga)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(keluarga.id)}
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
                {currentKeluarga?.id ? "Edit Keluarga" : "Add New Keluarga"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      label="No Kartu Keluarga"
                      name="no_kk"
                      value={formData.no_kk || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {currentKeluarga ? "Update" : "Create"}
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

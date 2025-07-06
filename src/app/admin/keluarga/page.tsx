"use client";
import React from "react";
import {
  createKeluarga,
  updateKeluarga,
  deleteKeluarga,
} from "@/database/keluarga";
import { Keluarga } from "@/types/keluarga";
import { Button, Modal, Input, Alert, Card } from "@heroui/react";
import { useKeluarga } from "@/hooks/useKeluarga";

export default function KeluargaAdminPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentKeluarga, setCurrentKeluarga] = React.useState<Keluarga | null>(
    null
  );
  const [formData, setFormData] = React.useState<Partial<Keluarga>>({
    no_kk: "",
  });

  const { keluargaList, error: fetchError } = useKeluarga();
  const [loading, setLoading] = React.useState(false);
  const [mutationError, setMutationError] = React.useState<Error | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Keluarga>) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentKeluarga?.id) {
        await updateKeluarga(currentKeluarga.id, formData);
      } else {
        await createKeluarga(formData);
      }
      setIsModalOpen(false);
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
    setIsModalOpen(true);
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
        <Button onClick={() => setIsModalOpen(true)}>Add New Keluarga</Button>
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
              <th className="text-left p-2">Created At</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keluargaList.map((keluarga: Keluarga) => (
              <tr key={keluarga.id} className="border-t">
                <td className="p-2">{keluarga.no_kk}</td>
                <td className="p-2">{keluarga.createdAt?.toLocaleString()}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(keluarga)}>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentKeluarga ? "Edit Keluarga" : "Add New Keluarga"}
      >
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
              <Button variant="light" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {currentKeluarga ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </Card>
  );
}

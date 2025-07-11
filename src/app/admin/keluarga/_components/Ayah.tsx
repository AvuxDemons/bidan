"use client";

import { createAyah, updateAyah, deleteAyah } from "@/database/ayah";
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  SelectItem,
  Spinner,
} from "@heroui/react";
import {
  Input,
  Modal,
  Table,
  Button,
  Select,
  Pagination,
} from "@/components/ui/HeroUI";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { useDebounce } from "use-debounce";
import { presetPagination } from "@/types/pagination";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { usePaginatedCollection } from "@/hooks/usePaginatedCollection";
import TableTitle from "@/components/ui/Table/Title";
import TableAction from "@/components/ui/Table/Action";

const defaultFormData: Partial<Ayah> = {
  nik: "",
};

const Ayah = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [mutationError, setMutationError] = useState<Error | null>(null);
  const [formData, setFormData] = useState<Partial<Ayah>>(defaultFormData);

  const {
    loading,
    setLoading,
    data,
    paginated,
    search,
    setSearch,
    page,
    setPage,
    totalData,
    filter,
    pageSize,
    setPageSize,
    sort,
  } = usePaginatedCollection<Ayah>({
    collectionPath: "ayah",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      filter((item: Ayah) => item.nik.includes(debouncedSearch.toLowerCase()));
    } else {
      filter(() => true);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (currentAyah) {
      setFormData(currentAyah);
    }
  }, [currentAyah]);

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
      onOpenChange();
      setFormData(defaultFormData);
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ayah: Ayah) => {
    setCurrentAyah(ayah);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteAyah(id);
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Section className="px-4 py-3 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <TableTitle title="Ayah" description="List Data Ayah" />
          <div className="flex flex-row items-center gap-2">
            <Input
              type="text"
              placeholder="Search"
              startContent={<FaSearch className="text-primary" />}
              value={search}
              onValueChange={setSearch}
            />
            <Button
              onPress={() => {
                onOpen();
                setCurrentAyah(null);
              }}
              color="primary"
              startContent={<FaPlus />}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xs">
              Total&nbsp;<span className="font-semibold">{totalData}</span>
              &nbsp;Ayah
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs">Showing</span>
              <Select
                disallowEmptySelection
                size="xs"
                variant="bordered"
                classNames={{ trigger: "bg-default-50" }}
                className="w-20"
                selectedKeys={[pageSize.toString()]}
                onSelectionChange={(keys) => {
                  const size = Number(Array.from(keys)[0]);
                  setPageSize(size);
                }}
                items={presetPagination}
              >
                {(item: any) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                )}
              </Select>
            </div>
          </div>

          <Table aria-label="Tabel Ayah" color="primary">
            <TableHeader>
              <TableColumn>Ayah</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody
              items={paginated}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item: Ayah) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nik}</TableCell>
                  <TableCell className="flex flex-row justify-center items-center gap-2">
                    <TableAction
                      onUpdate={() => {
                        handleEdit(item);
                        onOpen();
                      }}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Pagination
            loop
            showControls
            initialPage={1}
            page={page}
            total={Math.ceil(totalData / pageSize)}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </Section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {currentAyah ? "Update" : "Tambah"} Ayah
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <Input
                    label="No Kartu Ayah"
                    name="nik"
                    value={formData.nik || ""}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {currentAyah ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Ayah;

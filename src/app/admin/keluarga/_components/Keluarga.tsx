"use client";

import {
  createKeluarga,
  updateKeluarga,
  deleteKeluarga,
} from "@/database/keluarga";
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

const defaultFormData: Partial<Keluarga> = {
  no_kk: "",
  // add other fields if necessary
};

const Keluarga = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onOpenChange: onOpenDetailChange,
  } = useDisclosure();

  const [currentKeluarga, setCurrentKeluarga] = useState<Keluarga | null>(null);
  const [mutationError, setMutationError] = useState<Error | null>(null);
  const [formData, setFormData] = useState<Partial<Keluarga>>(defaultFormData);

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
  } = usePaginatedCollection<Keluarga>({
    collectionPath: "keluarga",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      filter((item: Keluarga) =>
        item.no_kk.includes(debouncedSearch.toLowerCase())
      );
    } else {
      filter(() => true);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (currentKeluarga) {
      setFormData(currentKeluarga);
    }
  }, [currentKeluarga]);

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
      setFormData(defaultFormData);
      setMutationError(null);
    } catch (err) {
      setMutationError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (keluarga: Keluarga) => {
    setCurrentKeluarga(keluarga);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteKeluarga(id);
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
          <TableTitle title="Keluarga" description="List Data Keluarga" />
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
                setCurrentKeluarga(null);
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
              &nbsp;Keluarga
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

          <Table aria-label="Tabel Keluarga" color="primary">
            <TableHeader>
              <TableColumn>Keluarga</TableColumn>
              <TableColumn className="flex justify-center items-center">
                Action
              </TableColumn>
            </TableHeader>
            <TableBody
              items={paginated}
              loadingContent={<Spinner label="Loading..." />}
            >
              {(item: Keluarga) => (
                <TableRow key={item.id}>
                  <TableCell>{item.no_kk}</TableCell>
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
                {currentKeluarga ? "Update" : "Tambah"} Keluarga
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Keluarga;

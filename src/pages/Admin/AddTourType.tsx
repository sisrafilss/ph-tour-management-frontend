import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";

import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddTourModal from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [removeTourType] = useRemoveTourTypeMutation();
  const [limit] = useState(10);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });

  const handleRemoveTourType = async (tourTypeId: string) => {
    const toasId = toast.loading("Removing Tour Type");
    try {
      const res = await removeTourType(tourTypeId).unwrap();

      if (res.success) {
        toast.success("Tour type removed", { id: toasId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Tyeps</h1>
        <AddTourModal />
      </div>
      <div className="border border-muted round-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Name</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string; _id: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>

                <TableCell className="text-right">
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button>
                      <Trash2 size="sm" />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && (
        <div className="flex justify-end">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`${
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                  />
                </PaginationItem>
                <PaginationItem>
                  {Array.from({ length: totalPage }, (_, index) => (
                    <PaginationLink
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  ))}
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`${
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTourType;

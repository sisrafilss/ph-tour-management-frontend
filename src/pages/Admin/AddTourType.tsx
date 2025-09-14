import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";

import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddTourModal from "@/components/modules/Admin/TourType/AddTourModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourTypeId: string) => {
    const toasId = toast.loading("Removing Tour Type");
    try {
      const res = await removeTourType(tourTypeId).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Tour type removed", { id: toasId });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            {data?.map((item: { name: string; _id: string }) => (
              <TableRow>
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
    </div>
  );
};

export default AddTourType;

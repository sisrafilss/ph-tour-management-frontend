import SingleFileUploader from "@/components/SingleFileUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

const addDivisionSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const AddDivisionModal = () => {
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [addDivision] = useAddDivisionMutation();

  const form = useForm<z.infer<typeof addDivisionSchema>>({
    resolver: zodResolver(addDivisionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addDivisionSchema>) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(values));
    formData.append("file", image as File);

    const toastId = toast.loading("Adding Division...");

    try {
      const res = await addDivision(formData).unwrap();
      if (res.success) {
        toast.success("Division added", { id: toastId });
        setOpen(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (!err?.data?.success) {
        toast.error(err?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Division</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="add-division-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Enter division name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Description"
                        className="h-16"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
            <SingleFileUploader onChange={setImage} />
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="add-division-form" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddDivisionModal;

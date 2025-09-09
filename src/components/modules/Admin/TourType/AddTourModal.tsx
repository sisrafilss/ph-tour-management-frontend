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
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import z from "zod";

const tourTypeNameSchema = z.object({
  name: z.string(),
});

const AddTourModal = () => {
  const [addTourType] = useAddTourTypeMutation();

  const form = useForm<z.infer<typeof tourTypeNameSchema>>({
    resolver: zodResolver(tourTypeNameSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tourTypeNameSchema>) => {
    console.log(values);
    try {
      const result = await addTourType(values).unwrap();
      console.log(result);

      if (result) {
        toast.success("Tour type added successfully");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.data.message) {
        toast.error(err.data.message);
      }
      console.error(err);
    }
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Add Tour Type</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Tour Type</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                id="tour-type-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Type Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Enter Tour Type"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button form="tour-type-form" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTourModal;

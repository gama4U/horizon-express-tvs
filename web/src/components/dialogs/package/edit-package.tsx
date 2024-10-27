import {
  Dialog,
  DialogClose,
  DialogContent,
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
  FormMessage,
} from "@/components/ui/form";
import { Loader2, PackageOpen, Pencil, } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CommonInput from "@/components/common/input";
import { IPackage, IUpdatePackage } from "@/interfaces/package.interface";
import { updatePackage } from "@/api/mutations/package.mutation";
import { MultiInput } from "@/components/common/multi-input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required"
  }),
  inclusions: z.array(
    z.string().trim().min(1, {
      message: "Inclusion item must not be empty"
    })
  ).refine(items => items.length > 0, {
    message: 'Please add at least one inclusion'
  }),
  exclusions: z.array(
    z.string().trim().min(1, {
      message: "Exclusion item must not be empty"
    })
  ).refine(items => items.length > 0, {
    message: 'Please add at least one exclusion'
  }),
  remarks: z.string().trim().min(1, {
    message: "Remarks is required"
  }),
});

interface Props {
  data: IPackage
}

export default function EditPackageDialog({ data }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      inclusions: [],
      exclusions: [],
      remarks: '',
    }
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        inclusions: data.inclusions,
        exclusions: data.exclusions,
        remarks: data.remarks,
      })
    }
  }, [data]);

  const { mutate: updatePackageMutate, isPending } = useMutation({
    mutationFn: async (data: IUpdatePackage) => await updatePackage(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['packages'] })
      form.reset();
      setOpen(false);
      toast.success("Package updated successfully", {
        position: 'top-center',
        className: 'text-primary'
      });
    },
    onError: (error) => {
      toast.success(error.message, {
        position: 'top-center',
        className: 'text-destructive'
      });
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePackageMutate({
      id: data.id,
      ...values
    });
  }

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger>
        <Button size={'icon'} variant={'ghost'} className="hover:text-primary">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] max-h-[560px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageOpen size={24} />
            <p className="flex-1 truncate">
              Update package
            </p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="w-full space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Package name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inclusions"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Inclusions</FormLabel>
                    <FormControl>
                      <MultiInput {...field} placeholder="Add inclusions (Enter to add) "/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exclusions"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Exclusions</FormLabel>
                    <FormControl>
                      <MultiInput {...field} placeholder="Add exclusions (Enter to add)"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl className="w-2/3">
                      <Textarea
                        {...field}
                        placeholder="Start writing remarks..."
                        className="w-full bg-slate-100 border-none text-[12px] resize-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <DialogClose>
                <Button
                  type="button"
                  variant={'outline'}
                  className="flex gap-2 mt-4"
                  disabled={isPending}
                >
                  <span>Cancel</span>
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex gap-2 mt-4"
                disabled={isPending}
              >
                {isPending &&
                  <Loader2 size={20} className="animate-spin" />
                }
                <span>Save</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

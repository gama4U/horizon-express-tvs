import { Loader2, NotepadText, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import CommonInput from "../common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateSalesAgreement } from "../../interfaces/sales-agreement.interface";
import { createSalesAgreement } from "../../api/mutations/sales-agreement.mutation";
import { useState } from "react";
import { toast } from "sonner";
import UploadDocumentsInput from "../inputs/upload-documents";

const formSchema = z.object({
  salesAgreementNumber: z.string().min(1, {
    message: 'Sales agreement number is required'
  }),
  suppliersPoNumber: z.string().min(1, {
    message: 'Supplier PO number is required'
  }),
  documents: z.array(z.string()).refine(value => value.length > 0, {
    message: 'At least one document is required'
  })
})

export default function CreateSalesAgreementDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesAgreementNumber: '',
      suppliersPoNumber: '',
      documents: []
    }
  });

  const {mutate: createMutate, isPending} = useMutation({
    mutationFn: async (data: ICreateSalesAgreement) => await createSalesAgreement(data),
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['exam']})
      form.reset();
      setOpen(false);
      toast.success("Sales agreement created successfully", { 
        position: 'top-center', 
        className: 'text-primary'
      });
    },
    onError: (error) => {
      toast.error(error.message, { 
        position: 'top-center', 
      })
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutate({
      ...values
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gap-1">
          <Plus size={22}/>
          <span>Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <NotepadText size={24} className="text-secondary"/>
            Create Sales Agreement
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="salesAgreementNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sales agreement number</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Sales agreement number"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suppliersPoNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier PO number</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }}  placeholder="Supplier PO number"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documents</FormLabel>
                    <FormControl>
                      <UploadDocumentsInput 
                        values={field.value}
                        onValuesChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
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
                    <Loader2 size={20} className="animate-spin"/>
                  }
                  <span>Create</span>
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

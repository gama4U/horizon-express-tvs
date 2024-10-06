import { FilePlus, Loader2, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import CommonInput from "../../common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addSalesAgreementItem } from "../../../api/mutations/sales-agreement-item.mutation";
import { IAddSalesAgreementItem } from "../../../interfaces/sales-agreement-item.interface";

const formSchema = z.object({
  particulars: z.string().min(1, {
    message: 'Particulars is required'
  }),
  quantity: z.string().refine(value => {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue > 0;
  }, {
    message: 'Invalid quantity'
  }),
  unitPrice: z.string().refine(value => {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue > 0;
  }, {
    message: 'Invalid unit price'
  }),
  total: z.number().refine(value => value > 0, {
    message: 'Invalid total'
  }),
});

interface Props {
  salesAgreementId: string;
}
export default function AddSalesAgreementItemDialog({salesAgreementId}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      particulars: '',
    }
  });

  const quantity = form.watch('quantity');
  const unitPrice = form.watch('unitPrice');

  useEffect(() => {
    const total = (Number(quantity) * Number(unitPrice));
    form.setValue('total', total);
  }, [quantity, unitPrice])


  const {mutate: createMutate, isPending} = useMutation({
    mutationFn: async (data: IAddSalesAgreementItem) => await addSalesAgreementItem(data),
    onSuccess: (data) => {
      queryClient.refetchQueries({queryKey: ['sales-agreement-details']})
      form.reset();
      setOpen(false);
      toast.success(data.message, { 
        position: 'top-center', 
        className: 'text-primary'
      });
    },
    onError: (error) => {
      toast.error(error.message, { 
        position: 'top-center',
        className: 'text-destructive'
      })
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutate({
      salesAgreementId,
      particulars: values.particulars,
      quantity: Number(values.quantity),
      unitPrice: Number(values.unitPrice),
      total: Number(values.total)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'icon'} variant={'ghost'} className="text-primary">
          <Plus size={18}/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus size={24} className="text-secondary"/>
            <span>
              Add sales agreement item
            </span>
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="particulars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Particulars:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Particulars"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} type="number" placeholder="Quantity"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit price:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} type="number" placeholder="Unit price"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field, readOnly: true }} type="number" placeholder="Total"/>
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

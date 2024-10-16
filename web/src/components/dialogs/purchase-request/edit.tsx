import { FilePlus, Loader2, Pencil } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { IPurchaseRequestOrder, IUpdatePurchaseRequest, PaymentType, PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import { updatePurchaseRequest } from "@/api/mutations/purchase-request..mutation";

const typeLabelMap: Record<PurchaseRequestOrderType, string> = {
  ACCOMMODATION: 'Accommodation',
  VISA: 'Visa',
  SHIPPING: 'Shipping',
  TRANSPORTATION_RENTAL: 'Transportation Rental',
  DOMESTIC_AIRLINE_TICKETING: 'Domestic Airline Ticketing',
  INTERNATIONAL_AIRLINE_TICKETING: 'International Airline Ticketing',
}

const paymentTypeLabelMap: Record<PaymentType, string> = {
  CASH: 'Cash',
  CHECK: 'Check',
}

const formSchema = z.object({
  suppliersName: z.string().min(1, {
    message: 'Supplier name is required'
  }),
  serialNumber: z.string().min(1, {
    message: 'Serial number is required'
  }),
  type: z.enum([
    PurchaseRequestOrderType.ACCOMMODATION,
    PurchaseRequestOrderType.VISA,
    PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
    PurchaseRequestOrderType.SHIPPING,
    PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
    PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
  ]),
  paymentType: z.enum([
    PaymentType.CASH,
    PaymentType.CHECK,
  ]),
  expenses: z.string().min(1, {
    message: 'Expense is required'
  }),
  other: z.string().optional(),
  nos: z.string().min(1, {
    message: 'NOS is required'
  }),
})

interface Props {
  data: IPurchaseRequestOrder;
}

export default function EditPurchaseRequestDialog({ data }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suppliersName: '',
      serialNumber: '',
      type: PurchaseRequestOrderType.VISA,
      paymentType: PaymentType.CASH,
      expenses: '',
      nos: '',
    }
  });

  const { mutate: updateMutate, isPending } = useMutation({
    mutationFn: async (data: IUpdatePurchaseRequest) => await updatePurchaseRequest(data),
    onSuccess: (data) => {
      if (location.pathname === '/admin/purchase-requests') {
        queryClient.refetchQueries({ queryKey: ['purchase-requests'] })
      } else {
        queryClient.refetchQueries({ queryKey: ['purchase-request-details'] })
      }
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

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        other: data.other || ''
      })
    }
  }, [form, data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutate({
      purchaseRequestId: data.id,
      ...values
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'icon'} variant={'ghost'} className="hover:text-primary">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus size={24} className="text-secondary" />
            Create purchase request order
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="suppliersName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier's name:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Name of supplier" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ser. No.:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Serial number" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Type:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(typeLabelMap).map(([value, label], index) => (
                            <SelectItem
                              key={index}
                              value={value}
                              className="text-[12px]"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Payment:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                            <SelectValue placeholder="Select a payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(paymentTypeLabelMap).map(([value, label], index) => (
                            <SelectItem
                              key={index}
                              value={value}
                              className="text-[12px]"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expenses:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Expenses" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nos:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Nos" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Others:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Others" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
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
                    <Loader2 size={20} className="animate-spin" />
                  }
                  <span>Save</span>
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

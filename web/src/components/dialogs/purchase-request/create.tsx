import { FilePlus, Loader2, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import CommonInput from "../../common/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useNavigate } from "react-router-dom";
import { ICreatePurchaseRequest, PaymentType, PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import { createPurchaseRequest } from "@/api/mutations/purchase-request..mutation";

const typeLabelMap: Record<PurchaseRequestOrderType, string> = {
  HOTEL: 'Hotel',
  INTERNATIONAL_PACKAGE: 'International Package',
  LOCAL_PACKAGE: 'Local Package',
  TICKET: 'Ticket',
  VISA: 'Visa',
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
    PurchaseRequestOrderType.HOTEL,
    PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
    PurchaseRequestOrderType.LOCAL_PACKAGE,
    PurchaseRequestOrderType.TICKET,
    PurchaseRequestOrderType.VISA,
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

export default function CreatePurchaseRequestDialog() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suppliersName: '',
      serialNumber: '',
      type: PurchaseRequestOrderType.HOTEL,
      paymentType: PaymentType.CASH,
      expenses: '',
      nos: '',
    }
  });

  const {mutate: createMutate, isPending} = useMutation({
    mutationFn: async (data: ICreatePurchaseRequest) => await createPurchaseRequest(data),
    onSuccess: (data) => {
      form.reset();
      setOpen(false);
      toast.success(data.message, { 
        position: 'top-center', 
        className: 'text-primary'
      });
      navigate(`/admin/purchase-requests/${data.id}`)
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
      ...values
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'sm'} className="gap-1">
          <Plus size={16}/>
          <span>Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePlus size={24} className="text-secondary"/>
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
                      <CommonInput inputProps={{ ...field }} placeholder="Name of supplier"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
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
                      <CommonInput inputProps={{ ...field }}  placeholder="Serial number"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
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
                      <FormMessage className="text-[10px]"/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem  className="w-full">
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
                      <FormMessage className="text-[10px]"/>
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
                      <CommonInput inputProps={{ ...field }}  placeholder="Expenses"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
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
                      <CommonInput inputProps={{ ...field }}  placeholder="Nos"/>
                    </FormControl>
                    <FormMessage className="text-[10px]"/>
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
                      <CommonInput inputProps={{ ...field }}  placeholder="Others"/>
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

import { Check, ChevronsUpDown, FileEdit, FilePlus, Loader2, Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import CommonInput from "../../common/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { IPurchaseRequestOrder, IUpdatePurchaseRequest, PaymentType, PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import { updatePurchaseRequest } from "@/api/mutations/purchase-request..mutation";
import Constants from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { fetchSuppliers } from "@/api/queries/suppliers.query";
import useDebounce from "@/hooks/useDebounce";

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
  supplierId: z.string().min(1, {
    message: 'Supplier id is required'
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
  disbursementType: z.string().min(1, {
    message: 'Disbursement type is required'
  }),
  classification: z.string().min(1, {
    message: 'Classification is required'
  }),
  classificationType: z.string().min(1, {
    message: 'Classification type is required'
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
  const [supplierSearch, setSupplierSearch] = useState('');
  const debouncedSearch = useDebounce(supplierSearch, 200);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: '',
      type: PurchaseRequestOrderType.VISA,
      paymentType: PaymentType.CASH,
      nos: '',
    }
  });

  const selectedDisbursementType =  form.watch('disbursementType');
  const selectedClassification =  form.watch('classification');

  const {data: suppliers} = useQuery({
    queryKey: ['suppliers', debouncedSearch],
    queryFn: async() => await fetchSuppliers({search: debouncedSearch}),
  })

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

  function renderSelectedCompany(supplierId?: string) {
    if (!supplierId) return "Select language";

    const supplier = suppliers?.suppliersData.find((supplier) => supplier.id === supplierId);
    if (!supplier) return "Select language";

    return supplier?.name;
  }

  const classifications = Constants.Disbursements.find(item => item.type === selectedDisbursementType)?.classifications || [];
  const classificationTypes = classifications.find(item => item.label === selectedClassification)?.types || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'icon'} variant={'ghost'} className="hover:text-primary">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit size={24} className="text-secondary" />
            Edit purchase request order
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[12px]">Supplier</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between text-[12px]",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {renderSelectedCompany(field.value)}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[550px] p-0">
                        <Command shouldFilter={false}>
                          <CommandInput
                            className="text-[12px]"
                            onValueChange={(value) => setSupplierSearch(value)}
                            placeholder="Search language..." 
                          />
                          <CommandList className="w-full">
                            <CommandEmpty>No supplier found.</CommandEmpty>
                            <CommandGroup>
                              {suppliers?.suppliersData.map((supplier, index) => (
                                <CommandItem
                                  value={supplier.id}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue("supplierId", supplier.id)
                                  }}
                                  className="text-[12px]"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      supplier.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  <span>{supplier.name}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">Ser. No.:</FormLabel>
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
                      <FormLabel className="text-[12px]">Type:</FormLabel>
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
                      <FormLabel className="text-[12px]">Payment:</FormLabel>
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
                name="disbursementType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[12px]">Disbursement Type:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                          <SelectValue placeholder="Select disbursement type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Constants.Disbursements.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.type}
                            className="text-[12px]"
                          >
                            {item.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="classification"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[12px]">Classification:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                            <SelectValue placeholder="Select classification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classifications.length <= 0 && (
                            <div className="text-[12px] text-muted-foreground p-1">
                              <span>Empty</span>
                            </div>
                          )}
                          {classifications.map((item, index) => (
                            <SelectItem
                              key={index}
                              value={item.label}
                              className="text-[12px]"
                            >
                              {item.label}
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
                  name="classificationType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[12px]">Classification Type:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                            <SelectValue placeholder="Select classification type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classificationTypes.length <= 0 && (
                            <div className="text-[12px] text-muted-foreground p-1">
                              <span>Empty</span>
                            </div>
                          )}
                          {classificationTypes.map((item, index) => (
                            <SelectItem
                              key={index}
                              value={item.label}
                              className="text-[12px]"
                            >
                              {item.label}
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
                name="nos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">Nos:</FormLabel>
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
                    <FormLabel className="text-[12px]">Others:</FormLabel>
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

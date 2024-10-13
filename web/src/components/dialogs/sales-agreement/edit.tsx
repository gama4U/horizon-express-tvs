import { FilePenLine, Loader2, Pencil} from "lucide-react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import CommonInput from "../../common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISalesAgreement, IUpdateSalesAgreement, TypeOfClient } from "../../../interfaces/sales-agreement.interface";
import { updateSalesAgreement } from "../../../api/mutations/sales-agreement.mutation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import Constants from "../../../constants";

const formSchema = z.object({
  clientName: z.string().min(1, {
    message: 'Client name is required'
  }),
  serialNumber: z.string().min(1, {
    message: 'Serial number is required'
  }),
  typeOfClient: z.enum([
    TypeOfClient.WALK_IN,
    TypeOfClient.CORPORATE,
    TypeOfClient.GOVERNMENT,
  ]),
})

interface Props {
  data: ISalesAgreement;
}

export default function EditSalesAgreementDialog({data}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeOfClient: TypeOfClient.WALK_IN,
      serialNumber: '',
      clientName: ''
    }
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      })
    }
  }, [data]);
  
  const {mutate: createMutate, isPending} = useMutation({
    mutationFn: async (data: IUpdateSalesAgreement) => await updateSalesAgreement(data),
    onSuccess: (data) => {
      if (location.pathname === '/admin/sales-agreements') {
        queryClient.refetchQueries({queryKey: ['sales-agreements']})
      } else {
        queryClient.refetchQueries({queryKey: ['sales-agreement-details']})
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutate({
      salesAgreementId: data.id,
      ...values
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={'icon'} variant={'ghost'} className="hover:text-primary">
          <Pencil size={16}/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePenLine  size={24} className="text-secondary"/>
            Edit sales agreement
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <CommonInput inputProps={{ ...field }} placeholder="Client name"/>
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
              <FormField
                control={form.control}
                name="typeOfClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Constants.ClientTypesMap).map(([value, label], index) => (
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

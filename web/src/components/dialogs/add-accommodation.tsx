import { z } from "zod";
import CommonInput from "../common/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AccommodationType, IAddAccommodation } from "../../interfaces/accommodation.interface";
import { toast } from "sonner";
import { addAccommodation } from "../../api/mutations/accommodation.mutation";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DatePicker } from "../common/date-picker";
import { Textarea } from "../ui/textarea";

const accommodationTypesMap: Record<AccommodationType, string> = {
  [AccommodationType.HOTEL]: 'Hotel',
  [AccommodationType.AIRBNB]: 'AIRBNB', 
  [AccommodationType.RESORT]: 'Resort', 
  [AccommodationType.OTHERS]: 'Others', 
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required."
  }),
  type: z.enum([
    AccommodationType.HOTEL,
    AccommodationType.AIRBNB,
    AccommodationType.RESORT,
    AccommodationType.OTHERS,
  ]),
  checkinDate: z.date(),
  checkoutDate: z.date(),
  hotelConfirmationNumber: z.string().trim().min(1, {
    message: "Hotel confirmation number is required."
  }),
  remarks: z.string().optional(),
});

interface Props {
  transactionId: string;
}

export default function AddAccommodationForm({transactionId}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: AccommodationType.HOTEL,
      hotelConfirmationNumber: "",
    }
  });

  const {mutate: addAccommodationMutate, isPending: signingUp} = useMutation({
    mutationFn: async (data: IAddAccommodation) => await addAccommodation(data),
    onError: (error) => {
      toast.error(error.message, { 
        className: 'text-destructive',
        position: 'top-center', 
      })
    },
    onSuccess: () => {
      toast.success("Accommodation added successfully", {
        className: 'text-primary',
        position: 'top-center', 
      });
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addAccommodationMutate({
      transactionId,
      ...values
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button 
          size={'sm'} 
          className="gap-1 w-[80px]"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Accommodation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Name</FormLabel>
                  <FormControl>
                    <CommonInput placeholder='Input name' inputProps={{ ...field }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-100 border-none text-[12px]">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(accommodationTypesMap).map(([key, value], index) => (
                        <SelectItem 
                          value={key} 
                          key={index}
                          className="text-[12px]"
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hotelConfirmationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Hotel number</FormLabel>
                  <FormControl>
                    <CommonInput placeholder='Hotel confirmation number' inputProps={{ ...field }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="checkinDate"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="text-[12px]">Check in</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkoutDate"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="text-[12px]">Check out</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px]">Remarks (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write remarks..." className="bg-slate-100 text-[12px]"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <DialogClose>
                <Button 
                  size={'sm'} 
                  variant={'outline'} 
                  className="w-[80px]"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button size={'sm'} className="w-[80px]">
                {signingUp ? (
                  <>
                    <Loader2 size={18} className="animate-spin"/>
                    <span>Saving...</span>
                  </>
                ) : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

    
  )
}

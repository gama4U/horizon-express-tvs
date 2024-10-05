import { useQuery } from "@tanstack/react-query";
import { IHorizonOnlyFields } from "../../../interfaces/transaction.interface";
import CommonInput from "../../common/input";
import { getAllUsers } from "../../../api/queries/user.query";
import { Input } from "../../ui/input";
import { useRecoilState } from "recoil";
import { transactionAtom } from "../../../utils/atoms";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import { Button } from "../../ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { fetchSalesAgreements } from "../../../api/queries/sales-agreements";
import usePagination from "../../../hooks/usePagination";
import useDebounce from "../../../hooks/useDebounce";
import { Separator } from "../../ui/separator";


interface Props {
  horizonFields?: IHorizonOnlyFields;
  transactionId?: string;
}

export default function HorizonOnlyForms({ horizonFields, transactionId }: Props) {
  const [transactionData, setTransactionData] = useRecoilState(transactionAtom);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { take } = usePagination();
  const [search, setSearch] = useState('');
  const [selectedSalesAgreement, setSelectedSalesAgreement] = useState('');
  const debouncedSearch = useDebounce(search, 500);


  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getAllUsers();
    },
  });
  const { data: salesAgreements, isLoading: salesAgreementLoading } = useQuery({
    queryKey: ['sales-agreements', debouncedSearch],
    queryFn: async () => await fetchSalesAgreements({ take: 100, search })
  });

  const handleSelectSalesAgreement = (salesAgreement: string) => {
    setSelectedSalesAgreement(salesAgreement)

  }

  const onChangeLeadName = (firstName: string, lastName: string) => {
    setTransactionData({
      ...transactionData,
      horizonOnly: {
        ...transactionData.horizonOnly,
        leadLastName: lastName,
        leadFirstName: firstName
      }
    });
  };
  const formSchema = z.object({
    leadId: z.string().min(2, {
      message: "Lead Id must be at least 2 characters.",
    }),
    salesAgreementId: z.string().min(2, {
      message: "Sales Agreement Id must be at least 2 characters.",
    }),
    purchaseOrderId: z.string().min(2, {
      message: "Purchase Order Id must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadId: "",
      salesAgreementId: "",
      purchaseOrderId: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data is', data)
  }

  return (
    <div className="rounded-lg border p-4 w-full flex flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center gap-x-2">
              <p className="text-xs flex-shrink-0 w-1/3">Select lead:</p>
              <FormField
                control={form.control}
                name="leadId"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-full justify-between ${!field.value && "text-muted-foreground"} text-xs`}
                          >
                            {field.value
                              ? (() => {
                                const employee = employees?.find(employee => employee.id === field.value);
                                return employee ? `${employee.firstName} ${employee.lastName}` : "Employee not found";
                              })()
                              : "Select lead"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search employee..." className="text-xs" />
                          <CommandList>
                            <CommandEmpty className="text-xs p-4">No employees found.</CommandEmpty>
                            <CommandGroup>
                              {employees?.map((employee) => (
                                <CommandItem
                                  key={employee.firstName + employee.lastName}
                                  className="text-xs"
                                  value={`${employee.firstName} ${employee.lastName}`}
                                  onSelect={() => {
                                    form.setValue("leadId", employee.id)
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${value === `${employee.firstName} ${employee.lastName}` ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {employee.firstName} {employee.lastName}
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
            </div>

            <div className="flex flex-row items-center gap-x-2">
              <p className="text-xs flex-shrink-0 w-1/3">Sales Agreement Number:</p>
              <FormField
                control={form.control}
                name="salesAgreementId"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`w-full justify-between  text-xs`}
                        >
                          {selectedSalesAgreement ? (
                            <p>{selectedSalesAgreement}</p>
                          ) : (
                            <p>Select sales agreement</p>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="p-4 flex flex-col w-full">

                        <CommonInput
                          placeholder="Search by client name or serial no."
                          containerProps={{ className: "w-full" }}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <Separator className="mb-2" />

                        {salesAgreementLoading ? (
                          <div className="flex justify-center items-center h-20 gap-x-2">
                            <Loader2 className="animate-spin" />
                            <p className="text-xs">Searching for sales agreement...</p>
                          </div>
                        ) : (
                          (search === '' ? (
                            <p className="text-xs text-left text-gray-500">Please enter a search term.</p>
                          ) : (
                            salesAgreements && salesAgreements.salesAgreements.length === 0 ? (
                              <p className="text-xs text-gray-500">No sales agreements found.</p>
                            ) : (
                              <div className="border p-2">
                                <div className="grid grid-cols-3 gap-2 text-xs font-bold mb-2">
                                  <p>Client Name</p>
                                  <p>Type</p>
                                  <p>Serial No.</p>
                                </div>
                                {salesAgreements?.salesAgreements.map((salesItem, index) => (
                                  <div
                                    className="grid grid-cols-3 border-b py-1 items-center cursor-pointer hover:bg-slate-100"
                                    key={index}
                                    onClick={() => {
                                      form.setValue("salesAgreementId", salesItem.id);
                                      handleSelectSalesAgreement(salesItem.id);
                                    }}
                                  >
                                    <p className="text-xs">
                                      <span className="font-medium">{salesItem.clientName}</span>
                                    </p>
                                    <p className="text-xs">
                                      <span className="font-medium">{salesItem.typeOfClient}</span>
                                    </p>
                                    <p className="text-xs">
                                      <span className="font-medium">{salesItem.serialNumber}</span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )
                          ))
                        )}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <p className="text-xs flex-shrink-0 w-1/3">Purchase Involve Number:</p>
              <FormField
                name="purchaseOrderId"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CommonInput
                        placeholder="Suppliers Involve Purchase Order #"
                        onChange={field.onChange}
                        defaultValue={field.value}
                        containerProps={{
                          className: 'flex-1',
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}

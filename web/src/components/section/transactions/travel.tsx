import { IHorizonOnlyFields } from "../../../interfaces/transaction.interface";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CommonInput from "../../common/input";
import { format, setDate } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useRecoilState } from "recoil";
import { transactionAtom } from "../../../utils/atoms";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"

interface Props {
  horizonFields?: IHorizonOnlyFields;
  transactionId?: string;
}

export default function TravelItineraryForms({ horizonFields, transactionId }: Props) {
  const [transactionData, setTransactionData] = useRecoilState(transactionAtom);
  const [etd, setEtd] = useState<Date>()
  const [eta, setEta] = useState<Date>()
  const [dateOfTravel, setDateOfTravel] = useState<Date>()

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const onChangeTravelType = (travelType: string) => {
    setTransactionData({
      ...transactionData,
      travelItinerary: {
        ...transactionData.travelItinerary,
        travelType: travelType
      }
    });
  };

  const onChangeETA = (date: Date | undefined) => {
    if (date)
      setTransactionData({
        ...transactionData,
        travelItinerary: {
          ...transactionData.travelItinerary,
          airline: {
            ...transactionData.travelItinerary.airline,
            eta: format(date, "MMMM d, yyyy")
          }
        }
      });
  }
  const onChangeETD = (date: Date | undefined) => {
    if (date)
      setTransactionData({
        ...transactionData,
        travelItinerary: {
          ...transactionData.travelItinerary,
          airline: {
            ...transactionData.travelItinerary.airline,
            etd: format(date, "MMMM d,yyyy")
          }
        }
      });

  }
  const onChangeDateOfTravel = (date: Date | undefined) => {
    if (date)
      setTransactionData({
        ...transactionData,
        travelItinerary: {
          ...transactionData.travelItinerary,
          shipping: {
            ...transactionData.travelItinerary.shipping,
            dateOfTravel: format(date, "MMMM d,yyyy")
          }
        }
      });
  }

  const onSubmit = () => { }

  return (
    <div className="rounded-lg border p-4 w-full flex flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <div className="flex flex-row items-center gap-x-2">
            <p className="text-xs flex-shrink-0 w-1/3">Select Travel Type:</p>
            <FormField
              name="travelType"
              render={() =>
                <Select onValueChange={onChangeTravelType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Travel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AIRLINES">Airlines</SelectItem>
                      <SelectItem value="SHIPPING">Shipping</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              }
            />
          </div>

          {transactionData.travelItinerary.travelType === 'AIRLINES' &&
            <>
              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Airlines Name</p>
                <FormField
                  render={() =>
                    <CommonInput
                      placeholder="Airlines Name"
                      onChange={(e) => setTransactionData({
                        ...transactionData,
                        travelItinerary: {
                          ...transactionData.travelItinerary,
                          airline: {
                            ...transactionData.travelItinerary.airline,
                            name: e.target.value
                          }
                        }
                      })}
                      containerProps={{
                        className: 'flex-1',
                      }}
                    />

                  }
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Airline Code:</p>
                <CommonInput
                  placeholder="Airlines Code #"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      airline: {
                        ...transactionData.travelItinerary.airline,
                        code: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">ETD:</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal text-xs ${!eta ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {etd ? format(etd, "PPP") : <span className="text-xs">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={etd}
                      onSelect={(date) => {
                        setEtd(date);
                        onChangeETD(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>

                </Popover>
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">ETA:</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal text-xs ${!eta ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eta ? format(eta, "PPP") : <span className="text-xs">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={eta}
                      onSelect={(date) => {
                        setEta(date);
                        onChangeETA(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>


              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Origin</p>
                <CommonInput
                  placeholder="Origin"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      airline: {
                        ...transactionData.travelItinerary.airline,
                        origin: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Destination</p>
                <CommonInput
                  placeholder="Destination"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      airline: {
                        ...transactionData.travelItinerary.airline,
                        destination: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>
            </>
          }
          {transactionData.travelItinerary.travelType === 'SHIPPING' &&
            <>
              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Shipping Name</p>
                <CommonInput
                  placeholder="Shipping Name"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      shipping: {
                        ...transactionData.travelItinerary.shipping,
                        name: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Voyage Number:</p>
                <CommonInput
                  placeholder="Voyage Number"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      shipping: {
                        ...transactionData.travelItinerary.shipping,
                        voyageNumber: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Date of Travel:</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal text-xs ${!dateOfTravel ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {etd ? format(etd, "PPP") : <span className="text-xs">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateOfTravel}
                      onSelect={(date) => {
                        setDateOfTravel(date);
                        onChangeDateOfTravel(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Origin</p>
                <CommonInput
                  placeholder="Origin"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      shipping: {
                        ...transactionData.travelItinerary.shipping,
                        origin: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <p className="text-xs flex-shrink-0 w-1/3">Destination</p>
                <CommonInput
                  placeholder="Destination"
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    travelItinerary: {
                      ...transactionData.travelItinerary,
                      shipping: {
                        ...transactionData.travelItinerary.shipping,
                        destination: e.target.value
                      }
                    }
                  })}
                  containerProps={{
                    className: 'flex-1',
                  }}
                />
              </div>
            </>
          }
        </form>
      </Form>
    </div>
  );
}

import { z } from "zod";
import CommonInput from "../../../common/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { format } from "date-fns"
import { Calendar } from "../../../ui/calendar"
import { CalendarIcon, ClipboardPlus, Loader2, MapPin, Trash2 } from "lucide-react"
import { Button } from "../../../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../../../ui/dialog"
import { Separator } from "../../../ui/separator"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AnimatedDiv from "../../../animated/Div";
import { createTourVoucher, ICreateItineraries, ICreateTourVoucher } from "../../../../api/mutations/transaction.mutation";
import { toast } from "sonner";

interface AddTourVoucherProps {
	transactionId: string
	openDialog: boolean
	setOpenDialog: (open: boolean) => void
}
const formSchema = z.object({
	tourGuide: z.string(),
	tourContact: z.string(),
	driverName: z.string(),
	driverContact: z.string(),
	remarks: z.string().optional(),
	itineraries: z.object({
		title: z.string(),
		description: z.string(),
		startDate: z.date(),
		endDate: z.date()
	}).array().optional(),
});

export function AddTourVoucherDialog({ transactionId, openDialog, setOpenDialog }: AddTourVoucherProps) {

	const queryClient = useQueryClient()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "itineraries"
	});

	const { mutate: addTourMutate, isPending: addingTour } = useMutation({
		mutationFn: async (data: ICreateTourVoucher) => await createTourVoucher(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			})
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['transaction'] })
			form.reset();
			setOpenDialog(false)
			toast.success("Tour Voucher added successfully", {
				className: 'text-primary',
				position: 'top-center',
			});
		}
	});


	function onSubmit(values: z.infer<typeof formSchema>) {
		const payload: ICreateTourVoucher = {
			transactionId,
			tourGuide: values.tourGuide,
			tourContact: values.tourContact,
			driverName: values.driverName,
			driverContact: values.driverContact,
			remarks: values.remarks,
			itineraries: values.itineraries?.map(itinerary => ({
				title: itinerary.title,
				description: itinerary.description,
				startDate: itinerary.startDate,
				endDate: itinerary.endDate,
			})),
		};
		addTourMutate(payload);
	}

	return (
		<Dialog
			open={openDialog}
			onOpenChange={() => {
				form.reset()
				setOpenDialog(false)
			}}>
			<DialogContent className="max-w-[700px] max-h-[700px] overflow-auto">
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						<MapPin />
						Add Tour Voucher
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<AnimatedDiv animationType="SlideInFromLeft" className="space-y-2" slideEntrancePoint={-50} duration={0.1}>
							<FormField
								control={form.control}
								name="tourGuide"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between gap-x-2">
											<p className="text-xs w-1/3">Tour Guide Name</p>
											<FormControl className="w-2/3">
												<CommonInput inputProps={{ ...field }} placeholder="Name of Tour Guide" containerProps={{ className: 'text-xs' }} />
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tourContact"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between gap-x-2">
											<p className="text-xs w-1/3">Tour Guide Contact #</p>
											<FormControl className="w-2/3">
												<CommonInput inputProps={{ ...field }} placeholder="e.g. 09239293 ..." containerProps={{ className: 'text-xs' }} />
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="driverName"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between gap-x-2">
											<p className="text-xs w-1/3">Driver Name</p>
											<FormControl className="w-2/3">
												<CommonInput inputProps={{ ...field }} placeholder="Name of Driver" containerProps={{ className: 'text-xs' }} />
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="driverContact"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between gap-x-2">
											<p className="text-xs w-1/3">Driver Contact #</p>
											<FormControl className="w-2/3">
												<CommonInput inputProps={{ ...field }} placeholder="e.g. 09239293 ..." containerProps={{ className: 'text-xs' }} />
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="remarks"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-row items-center justify-between gap-x-2">
											<p className="text-xs w-1/3">Remarks (optional)</p>
											<FormControl className="w-2/3">
												<CommonInput inputProps={{ ...field }} placeholder="Remarks.." containerProps={{ className: 'text-xs' }} />
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Separator />

							<div className="flex flex-row justify-between items-center">
								<p className="text-xs font-medium">Itineraries</p>
								<Button variant="ghost" type="button" className="text-xs gap-x-2"
									onClick={() => append({ title: "", description: "", startDate: new Date(), endDate: new Date() })}>
									Add Itinerary
									<ClipboardPlus size={14} />
								</Button>
							</div>

							{fields.map((field, index) => (
								<AnimatedDiv key={field.id} className="space-y-4" animationType="SlideInFromUp" slideEntrancePoint={-20}>
									<Separator />
									<div className="flex flex-row items-center justify-between">
										<p className="text-xs text-primary font-medium">Itinerary {index + 1}</p>
										<Button variant="destructive" type="button" onClick={() => remove(index)} className="text-xs gap-x-2">
											<Trash2 size={14} />
										</Button>
									</div>

									<FormField
										control={form.control}
										name={`itineraries.${index}.title`}
										render={({ field }) => (
											<FormItem>
												<div className="flex flex-row items-center justify-between gap-x-2">
													<p className="text-xs w-1/3">Itinerary Title</p>
													<FormControl className="w-2/3">
														<CommonInput inputProps={{ ...field }} placeholder="Title" containerProps={{ className: 'text-xs' }} />
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`itineraries.${index}.description`}
										render={({ field }) => (
											<FormItem>
												<div className="flex flex-row items-center justify-between gap-x-2">
													<p className="text-xs w-1/3">Description</p>
													<FormControl className="w-2/3">
														<CommonInput inputProps={{ ...field }} placeholder="Description" containerProps={{ className: 'text-xs' }} />
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`itineraries.${index}.startDate`}
										render={({ field }) => (
											<FormItem>
												<div className="flex flex-row justify-between gap-x-2 items-center">
													<p className="text-xs w-1/3">Start Date</p>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl className="w-2/3">
																<Button
																	variant={"outline"}
																	className={`w-full pl-3 text-left font-normal text-xs
                                    ${!field.value && "text-muted-foreground"}`}
																>
																	{field.value ? (
																		format(field.value, "PPP")
																	) : (
																		<span className="text-xs">Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="text-xs w-auto p-0" align="start">
															<Calendar
																className="text-xs"
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`itineraries.${index}.endDate`}
										render={({ field }) => (
											<FormItem>
												<div className="flex flex-row justify-between gap-x-2 items-center">
													<p className="text-xs w-1/3">End Date</p>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl className="w-2/3">
																<Button
																	variant={"outline"}
																	className={`w-full pl-3 text-left font-normal text-xs
                                    ${!field.value && "text-muted-foreground"}`}
																>
																	{field.value ? (
																		format(field.value, "PPP")
																	) : (
																		<span className="text-xs">Pick a date</span>
																	)}
																	<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className="text-xs w-auto p-0" align="start">
															<Calendar
																className="text-xs"
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

								</AnimatedDiv>
							))}
						</AnimatedDiv>

						<Button type="submit" className="text-xs" disabled={addingTour}>
							{
								addingTour ?
									<div className="flex flex-row items-center gap-x-">
										<p className="text-xs">Adding..</p>
										<Loader2 className="animate-spin" />
									</div> :
									<p className="text-xs">Add</p>
							}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>


	)

}

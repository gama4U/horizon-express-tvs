import { Check, ChevronsUpDown, ContactRound, Loader2, Pencil } from "lucide-react";
import { z } from "zod"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import AnimatedDiv from "@/components/animated/Div";
import { Form, FormItem, FormControl, FormField, FormMessage, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonInput from "@/components/common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CommonToast from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import { ISupplier, IUpdateSupplier, updateSupplier } from "@/api/mutations/supplier.mutation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Constants from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface IUpdateSupplierProps {
	supplierData: ISupplier
}

const formSchema = z.object({
	name: z.string().trim().min(1, {
		message: "Name is required."
	}),
	contact: z.string().trim().min(1, {
		message: "Contact number is required"
	}).optional(),
	address: z.string().trim().min(1, {
		message: "Email is required."
	}).optional(),
	emailAddress: z.string().email(),
	category: z.string().min(1, {
		message: 'Category is required'
	}),
	notes: z.string().optional(),
});

export default function EditSupplierDialog({ supplierData }: IUpdateSupplierProps) {
	const queryClient = useQueryClient()
	const { SupplierCategories } = Constants

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})
	const [openDialog, setOpenDialog] = useState(false)

	const { mutate: updateSupplierMutate, isPending: updatingSupplier } = useMutation({
		mutationFn: async (data: IUpdateSupplier) => await updateSupplier(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			})
		},
		onSuccess: () => {
			form.reset()
			queryClient.refetchQueries({ queryKey: ['suppliers'] })
			setOpenDialog(false)
			toast.custom(() => (
				<CommonToast message="Successfully updated supplier" />
			), {
				position: "bottom-right",
				duration: 2500,
			})
		}
	});

	useEffect(() => {
		if (supplierData) {
			form.reset({
				...supplierData
			})
		}
	}, [supplierData, form])

	function onSubmit(values: z.infer<typeof formSchema>) {
		updateSupplierMutate({
			id: supplierData.id,
			...values
		})
	}


	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger>
				<Button size={'icon'} variant={'ghost'} className="hover:text-primary">
					<Pencil size={16} />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-[700px] max-h-[520px] overflow-auto">
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						<ContactRound className="text-secondary" />
						Update Supplier
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<div className="space-y-8 p-4">
					<AnimatedDiv animationType="SlideInFromLeft" slideEntrancePoint={-20}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel className="text-[12px]">Select category</FormLabel>
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
															{field.value
																? SupplierCategories.find((item) => item === field.value)
																: "Select category"
															}
															<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[550px] p-0">
													<Command>
														<CommandInput
															className="text-[12px]"
															placeholder="Search supplier..."
														/>
														<CommandList className="w-full">
															<CommandEmpty>No category found.</CommandEmpty>
															<CommandGroup>
																{SupplierCategories.map((item, index) => (
																	<CommandItem
																		value={item}
																		key={index}
																		onSelect={() => {
																			form.setValue("category", item)
																		}}
																		className="text-[12px]"
																	>
																		<Check
																			className={cn(
																				"mr-2 h-4 w-4",
																				item === field.value
																					? "opacity-100"
																					: "opacity-0"
																			)}
																		/>
																		<span>{item}</span>
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
									name="name"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Client Name:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="Client name" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="contact"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Contact Number:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="e.g. 0938242.." containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="emailAddress"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Email:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="Email address" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Address:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="Supplier's Address" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Notes:</p>
												<FormControl className="w-2/3">
													<Textarea
														{...field}
														placeholder="Start writing notes..."
														className="w-full bg-slate-100 border-none text-[12px] resize-none focus-visible:ring-0"
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex flex-row items-center gap-x-2 justify-end">
									<Button type="submit" className="text-xs" disabled={updatingSupplier}>
										{
											updatingSupplier ?
												<div className="flex flex-row items-center gap-x-">
													<p className="text-xs">Updating..</p>
													<Loader2 className="animate-spin" />
												</div> :
												<p className="text-xs">Update</p>
										}
									</Button>
								</div>
							</form>
						</Form>
					</AnimatedDiv>
				</div>
			</DialogContent>
		</Dialog >
	);
}

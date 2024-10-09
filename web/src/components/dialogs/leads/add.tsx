import { Loader2, UserCircle } from "lucide-react";
import { z } from "zod"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import AnimatedDiv from "@/components/animated/Div";
import { Form, FormItem, FormControl, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonInput from "@/components/common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CommonToast from "@/components/common/toast";
import { createLead, ICreateLead } from "@/api/mutations/lead.mutation";
import { Button } from "@/components/ui/button";


interface ICreateLeadProps {
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}

const formSchema = z.object({
	firstName: z.string().trim().min(1, {
		message: "First name is required."
	}),
	middleName: z.string().trim().min(1, {
		message: "Middle name is required."
	}),
	lastName: z.string().trim().min(1, {
		message: "Last Name is required."
	}),
	contactNumber: z.string().trim().min(1, {
		message: "Contact number is required"
	}),
	email: z.string().trim().min(1, {
		message: "Email is required."
	}),
});


export default function CreateLeadDialog({ openDialog, setOpenDialog }: ICreateLeadProps) {
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const { mutate: createLeadMutate, isPending: creatingLead } = useMutation({
		mutationFn: async (data: ICreateLead) => await createLead(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			})
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['leads'] })
			setOpenDialog(false)
			form.reset()
			toast.custom(() => (
				<CommonToast message="Successfully created led" />
			), {
				position: "bottom-right",
			})
		}
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createLeadMutate(values)
	}

	return (
		<Dialog open={openDialog} onOpenChange={() => { setOpenDialog(false) }}>
			<DialogContent>
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						<UserCircle />
						Create Lead
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<div className="space-y-8 p-4">
					<AnimatedDiv animationType="SlideInFromLeft" slideEntrancePoint={-20}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">First Name:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="First name" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="middleName"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Middle Name:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="Middle name" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Last Name:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="Last name" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="contactNumber"
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Email address:</p>
												<FormControl className="w-2/3">
													<CommonInput inputProps={{ ...field }} placeholder="john@sampleemail.com" containerProps={{ className: 'text-xs' }} />
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex flex-row items-center gap-x-2 justify-end">
									<Button type="submit" className="text-xs" disabled={creatingLead}>
										{
											creatingLead ?
												<div className="flex flex-row items-center gap-x-">
													<p className="text-xs">Creating..</p>
													<Loader2 className="animate-spin" />
												</div> :
												<p className="text-xs">Create</p>
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

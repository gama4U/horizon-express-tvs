import { BookUser, CircleCheck, Loader2, SquareMenu, UserPlus } from "lucide-react";
import { z } from "zod"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import AnimatedDiv from "@/components/animated/Div";
import { Form, FormItem, FormControl, FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonInput from "@/components/common/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction, ICreateTransaction } from "@/api/mutations/transaction.mutation";
import { toast } from "sonner";
import CommonToast from "@/components/common/toast";
import { createLead, ICreateLead } from "@/api/mutations/lead.mutation";
import { Button } from "@/components/ui/button";


interface ICreateTransactionDialog {
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
	successNavigate: (data: any) => void
}
const cardOptions = [
	{
		key: 'new',
		title: 'Add',
		description: 'Create a new lead from scratch.',
		icon: <UserPlus size={82} className="text-muted-foreground" />
	},
	{
		key: 'existing',
		title: 'Select',
		description: 'Choose from the existing leads created.',
		icon: <BookUser size={82} className="text-muted-foreground" />
	}
];

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


export default function CreateTransactionDialog({ openDialog, setOpenDialog, successNavigate }: ICreateTransactionDialog) {
	const [step, setStep] = useState(0)
	const [selectedCard, setSelectedCard] = useState<string | null>(null);

	const handleSelectCard = (option: string) => {
		setSelectedCard(option);
		setStep(1)
	};
	const queryClient = useQueryClient()


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const { mutate: createTransactionMutate, isPending: creatingTransaction } = useMutation({
		mutationFn: async (data: ICreateTransaction) => await createTransaction(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			})
		},
		onSuccess: (data) => {
			queryClient.refetchQueries({ queryKey: ['transactions'] })
			toast.custom(() => (
				<CommonToast message="Successfully created transaction" />
			), {
				position: "bottom-right",
			})
			successNavigate(data)
		}
	});
	const { mutate: createLeadMutate, isPending: creatingLead } = useMutation({
		mutationFn: async (data: ICreateLead) => await createLead(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			})
		},
		onSuccess: (data) => {
			queryClient.refetchQueries({ queryKey: ['transactions'] })
			createTransactionMutate({
				id: data.id
			})
		}
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createLeadMutate(values)
	}


	return (
		<Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
			<DialogContent>
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						<SquareMenu />
						Create Transaction
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<div className="space-y-8 p-4">
					{step === 0 &&
						<div className="flex gap-x-2 justify-between w-full">
							{cardOptions.map((card) => (
								<AnimatedDiv
									slideEntrancePoint={-20}
									animationType="SlideInFromUp"
									key={card.key}
									className={`relative rounded-lg p-4 border-[1px] my-2 shadow-lg cursor-pointer hover:bg-green-100 flex flex-col justify-between w-[50%] h-[200px] ${selectedCard === card.key ? 'border-green-500 bg-green-100' : 'border-dotted'
										}`}
									onClick={() => handleSelectCard(card.key)}
								>
									{selectedCard === card.key && (
										<div className="absolute top-2 right-2 text-green-500">
											<AnimatedDiv animationType="Glowing" repeatDelay={0.5}>
												<CircleCheck size={24} />
											</AnimatedDiv>
										</div>
									)}
									<div className="flex flex-col items-start">
										<p className="text-lg font-normal text-muted-foreground">{card.title}</p>
										<p className="text-xs text-muted-foreground">{card.description}</p>
									</div>
									<div className="flex justify-end">
										{card.icon}
									</div>
								</AnimatedDiv>
							))}
						</div>}
					{step === 1 &&
						<AnimatedDiv animationType="SlideInFromLeft" slideEntrancePoint={-20}>
							<Form {...form}>
								<p className="text-sm font-medium my-2">Create new lead for transaction</p>
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
										<Button className="text-xs bg-muted-foreground" onClick={() => setStep(0)}>Back</Button>
										<Button type="submit" className="text-xs" disabled={creatingLead || creatingTransaction}>
											{
												creatingLead || creatingTransaction ?
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
					}
				</div>
			</DialogContent>
		</Dialog >
	);
}

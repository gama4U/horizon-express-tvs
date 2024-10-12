import { Loader2, StickyNote } from "lucide-react";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { createMemorandum, ICreateMemorandum } from "@/api/mutations/memorandum.mutation";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ICreateMemorandumProps {
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}

const formSchema = z.object({
	to: z.string().trim().min(1, {
		message: "To is required",
	}),
	re: z.string().trim().min(1, {
		message: "Re is required",
	}),
	addressee: z.string().trim().min(1, {
		message: "Addressee is required",
	}),
	contents: z.string().min(1, {
		message: "Content is required",
	}),
}
);

export default function CreateMemorandumDialog({ openDialog, setOpenDialog }: ICreateMemorandumProps) {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: createMemoMutate, isPending: creatingMemo } = useMutation({
		mutationFn: async (data: ICreateMemorandum) => await createMemorandum(data),
		onError: (error) => {
			toast.error(error.message, {
				className: "text-destructive",
				position: "top-center",
			});
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["memorandums"] });
			setOpenDialog(false);
			form.reset();
			toast.custom(() => <CommonToast message="Successfully created memorandum" />, {
				position: "bottom-right",
			});
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		createMemoMutate(values);
	}

	return (
		<Dialog open={openDialog} onOpenChange={() => { setOpenDialog(false); }}>
			<DialogContent>
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						<StickyNote />
						Create Memorandum
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<div className="space-y-8 p-4">
					<AnimatedDiv animationType="SlideInFromLeft" slideEntrancePoint={-20}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="to"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">To:</p>
												<FormControl className="w-2/3">
													<CommonInput
														inputProps={{ ...field }}
														placeholder="e.g. John Doe"
														containerProps={{ className: 'text-xs' }}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="re"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Re:</p>
												<FormControl className="w-2/3">
													<CommonInput
														inputProps={{ ...field }}
														placeholder="e.g. Quarterly Sales Report"
														containerProps={{ className: 'text-xs' }}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="addressee"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-row items-center justify-between gap-x-2">
												<p className="text-xs w-1/3">Addressee:</p>
												<FormControl className="w-2/3">
													<CommonInput
														inputProps={{ ...field }}
														placeholder="Subject addressee"
														containerProps={{ className: 'text-xs' }}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="contents"
									render={({ field }) => (
										<FormItem>
											<div className="flex flex-col space-y-2">
												<label className="text-xs">Content:</label>
												<FormControl>
													<ReactQuill
														value={field.value}
														onChange={field.onChange}
														placeholder="Write the memorandum content here..."
														modules={{
															toolbar: [
																[{ 'header': [1, 2, false] }],
																['bold', 'italic', 'underline', 'strike'],
																[{ 'list': 'ordered' }, { 'list': 'bullet' }],
																['link', 'image'],
																['clean']
															],
														}}
														className="w-full"
													/>
												</FormControl>
												<FormMessage />
											</div>
										</FormItem>
									)}
								/>

								<div className="flex flex-row items-center gap-x-2 justify-end">
									<Button type="submit" className="text-xs" disabled={creatingMemo}>
										{creatingMemo ? (
											<div className="flex flex-row items-center gap-x-2">
												<p className="text-xs">Creating...</p>
												<Loader2 className="animate-spin" />
											</div>
										) : (
											<p className="text-xs">Create</p>
										)}
									</Button>
								</div>
							</form>
						</Form>
					</AnimatedDiv>
				</div>
			</DialogContent>
		</Dialog>
	);
}

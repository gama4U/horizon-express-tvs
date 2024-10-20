import { DocumentTransactionType, IUpdateDocumentTransaction, transmitDocument, updateDocumentTransaction } from "@/api/mutations/document-transaction.mutation";
import { Separator } from "../../ui/separator";
import { IDocumentTransaction } from "@/api/queries/document-transaction.query";
import { DocumentTransactionBadge } from "@/components/badges/document-transaction-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CommonToast from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import { BadgeCheck, CheckCircleIcon, Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import TransactDocumentDialog from "@/components/dialogs/document-transactions/transact";
import { MultiSelect } from "@/components/common/multi-select";
import Constants from "@/constants";

interface DocumentTransactionProps {
	documentTransactionData: IDocumentTransaction;
}

export default function DocumentDetails({ documentTransactionData: data }: DocumentTransactionProps) {
	const [transactDialog, setTransactDialog] = useState<{ open: boolean; type: 'recievedBy' | 'recievedFrom' | "" }>({
		open: false,
		type: ""
	});
	const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

	const queryClient = useQueryClient();

	const { mutate: transmitDocumentMutate, isPending: transmittingDocument } = useMutation({
		mutationFn: async (id: string) => await transmitDocument(id),
		onError: (error) => {
			toast.error(error.message, {
				className: "text-destructive",
				position: "top-center",
			});
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["document-transactions"] });
			queryClient.refetchQueries({ queryKey: ["document-transaction-details"] });
			toast.custom(() => <CommonToast message="Successfully transmitted document" />, {
				position: "bottom-right",
			});
		},
	});

	const { mutate: updateMutate, isPending: updating } = useMutation({
		mutationFn: async (data: IUpdateDocumentTransaction) => await updateDocumentTransaction(data),
		onError: (error) => {
			toast.error(error.message, {
				className: "text-destructive",
				position: "top-center",
			});
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["document-transactions"] });
			queryClient.refetchQueries({ queryKey: ["document-transaction-details"] });
			toast.custom(() => <CommonToast message="Successfully updated document" />, {
				position: "bottom-right",
			});
		},
	});

	useEffect(() => {
		if (data.documents) {
			setSelectedDocuments(data.documents);
		}
	}, [data]);

	function handleSaveDocuments() {
		updateMutate({
			id: data.id,
			documents: selectedDocuments
		});
	}

	return (
		<div className="flex flex-col gap-y-6 p-4 m-2 sm:p-6 lg:p-8 mt-2 bg-white max-w-4xl mx-auto">
			<div className="mb-2 p-2">
				<div className="flex flex-row justify-between items-center text-sm">
					<span>Document Type:</span>
					<DocumentTransactionBadge type={data.type} />
				</div>
				<Separator className="my-2" />
				<div className="space-y-4">
					{data.type === DocumentTransactionType.RECIEVE && (
						<div className="flex flex-col space-y-2">
							<div className="flex flex-row items-center gap-x-2 text-xs">
								<span>Prepared By:</span>
								<span>{data.preparedBy.firstName} {data.preparedBy.lastName}</span>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-x-2">
									<span>Recieved From:</span>
									{data.recievedFromOutsider ? <span>{data.recievedFromOutsider}</span> : <span className="text-muted-foreground italic">Not yet received from</span>}
								</div>
								<Button variant="outline" size="icon" onClick={() => setTransactDialog({ open: true, type: 'recievedFrom' })}>
									<Pencil className="h-4 w-4 text-primary" />
								</Button>
							</div>
						</div>
					)}
					{data.type === DocumentTransactionType.TRANSMITTAL && (
						<div className="flex flex-col space-y-2">
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-x-2">
									<span>Transmitted By:</span>
									{data.transmittedBy ? (
										<div className="flex items-center gap-x-2">
											<span>{data.transmittedBy.firstName} {data.transmittedBy.lastName}</span>
											<CheckCircleIcon className="animate-pulse text-primary" />
										</div>
									) : (
										<span className="text-muted-foreground italic">Not yet transmitted</span>
									)}
								</div>
								{!data.transmittedBy && (
									<Button size={'sm'} onClick={() => transmitDocumentMutate(data.id)} className='gap-1' disabled={transmittingDocument}>
										{transmittingDocument ? <Loader2 size={16} className='animate-spin' /> : <BadgeCheck size={16} />}
										<span>Transmit</span>
									</Button>
								)}
							</div>
							<div className="flex items-center gap-x-2 text-xs">
								<span>Prepared By:</span>
								<span>{data.preparedBy.firstName} {data.preparedBy.lastName}</span>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-x-2">
									<span>Recieved By:</span>
									{data.recievedByOutsider ? <span>{data.recievedByOutsider}</span> : <span className="text-muted-foreground italic">Not yet received by</span>}
								</div>
								<Button variant="outline" size="icon" onClick={() => setTransactDialog({ open: true, type: 'recievedBy' })}>
									<Pencil className="h-4 w-4 text-primary" />
								</Button>
							</div>
						</div>
					)}

					{data.type === DocumentTransactionType.RETURN && (
						<div className="flex flex-col space-y-2">
							<div className="flex items-center gap-x-2 text-xs">
								<span>Returned/Prepared By:</span>
								<span>{data.preparedBy.firstName} {data.preparedBy.lastName}</span>
							</div>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-x-2">
									<span>Recieved By:</span>
									{data.recievedByOutsider ? <span>{data.recievedByOutsider}</span> : <span className="text-muted-foreground italic">Not yet received by</span>}
								</div>
								<Button variant="outline" size="icon" onClick={() => setTransactDialog({ open: true, type: 'recievedBy' })}>
									<Pencil className="h-4 w-4 text-primary" />
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="p-2">
				<p className="text-sm font-semibold">Update documents</p>
				<MultiSelect
					options={Constants.CommonDocuments}
					selectedOptions={selectedDocuments}
					onSelect={setSelectedDocuments}
					placeholder="Select documents..."
				/>
				<div className="flex justify-end">
					<Button onClick={handleSaveDocuments} className="flex gap-2 mt-4 text-xs" disabled={updating}>
						{updating && <Loader2 size={20} className="animate-spin" />}
						<span>Update</span>
					</Button>
				</div>
			</div>
			<TransactDocumentDialog
				id={data.id}
				existingData={data}
				type={transactDialog.type}
				openDialog={transactDialog.open}
				setOpenDialog={(open) => setTransactDialog((prev) => ({ ...prev, open }))} />
		</div>
	);
}

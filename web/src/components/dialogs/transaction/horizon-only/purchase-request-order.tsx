import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Separator } from "../../../ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";
import useDebounce from "@/hooks/useDebounce";
import CommonInput from "@/components/common/input";
import { CircleCheck } from "lucide-react";
import AnimatedDiv from "@/components/animated/Div";
import { Button } from "@/components/ui/button";
import { IUpdateTransaction, updateTransaction } from "@/api/mutations/transaction.mutation";
import { toast } from "sonner";
import { IPurchaseRequestOrder, PaymentType, PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import { fetchPurchaseRequestOrders } from "@/api/queries/purchase-request.queries";
import PurchaseRequestTypeFilter from "@/components/select/purchase-request/type-filter";
import PaymentTypeFilterSelect from "@/components/select/purchase-request/payment-type-filter";
import PurchaseRequestInfo from "@/components/section/purchase-request/info";

interface SelectPurchaseRequestProps {
	transactionId: string
	selectedPurchaseRequestOrder?: IPurchaseRequestOrder;
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}

export default function SelectPurchaseRequestDialog({
	selectedPurchaseRequestOrder,
	openDialog,
	setOpenDialog,
	transactionId
}: SelectPurchaseRequestProps) {
	const queryClient = useQueryClient();
	const { skip, take, pagination } = usePagination();
	const [search, setSearch] = useState('');
	const [typeFilter, setTypeFilter] = useState<PurchaseRequestOrderType | 'ALL'>('ALL');
	const [paymentTypeFilter, setPaymentTypeFilter] = useState<PaymentType | 'ALL'>('ALL');

	const debouncedSearch = useDebounce(search, 500);
	const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<IPurchaseRequestOrder | null>(null);

	const { data, isLoading } = useQuery({
		queryKey: ['purchase-requests', pagination, debouncedSearch, typeFilter, paymentTypeFilter],
		queryFn: async () => await fetchPurchaseRequestOrders({
			skip,
			take,
			search,
			...(paymentTypeFilter !== 'ALL' && {
				paymentType: paymentTypeFilter
			}),
			...(typeFilter !== 'ALL' && {
				type: typeFilter
			})
		})
	});

	const { mutate: updateTransactionMutate, isPending: updatingTransaction } = useMutation({
		mutationFn: async (data: IUpdateTransaction) => await updateTransaction(data),
		onError: (error) => {
			toast.error(error.message, {
				className: 'text-destructive',
				position: 'top-center',
			});
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['transaction'] });
			setOpenDialog(false);
			toast.success("Purchase request order successfully added", {
				className: 'text-primary',
				position: 'top-center',
			});
		}
	});

	const handleUpdatePurchaseOrder = () => {
		if (selectedPurchaseRequest) {
			updateTransactionMutate({
				id: transactionId,
				purchaseOrderId: selectedPurchaseRequest.id,
			});
		}
	};

	useEffect(() => {
		if (selectedPurchaseRequestOrder) {
			setSelectedPurchaseRequest(selectedPurchaseRequestOrder);
		}
	}, [selectedPurchaseRequestOrder]);

	const handleSelectPurchaseAgreement = (purchaseRequest: IPurchaseRequestOrder) => {
		setSelectedPurchaseRequest(purchaseRequest);
	};

	return (
		<Dialog
			open={openDialog}
			onOpenChange={() => {
				setOpenDialog(false);
			}}
		>
			<DialogContent className="max-w-auto max-h-[90vh] overflow-y-auto rounded-[25px] p-6">
				<DialogTitle>
					<DialogHeader className="flex flex-row items-center gap-x-2">
						Select Purchase Request Order
					</DialogHeader>
				</DialogTitle>
				<Separator />
				<div className="flex flex-row justify-center">
					<div className="w-full">
						<div className="flex flex-1 gap-2 items-center p-[1px] border-b pb-2">
							<CommonInput
								placeholder="Search by client name or serial no."
								containerProps={{
									className: "max-w-[500px]"
								}}
								defaultValue={search}
								onChange={(event) => setSearch(event.target.value)}
							/>
							<PurchaseRequestTypeFilter
								value={typeFilter}
								onValueChange={(value) => setTypeFilter(value)}
							/>
							<PaymentTypeFilterSelect
								value={paymentTypeFilter}
								onValueChange={(value) => setPaymentTypeFilter(value)}
							/>						</div>

						{data?.purchaseRequests?.slice(0, 2).map((purchaseRequest, index) => (
							<div
								className={`relative rounded-lg p-2 border-[1px] my-2 cursor-pointer hover:bg-green-100 
                                ${selectedPurchaseRequest?.id === purchaseRequest.id ? 'border-green-500 bg-green-100' : 'border-dotted'}`}
								key={index}
								onClick={() => handleSelectPurchaseAgreement(purchaseRequest)}>
								{selectedPurchaseRequest?.id === purchaseRequest.id && (
									<div className="absolute top-2 right-2 text-green-500">
										<AnimatedDiv animationType="Glowing" repeatDelay={0.5}>
											<CircleCheck size={24} />
										</AnimatedDiv>
									</div>
								)}
								<PurchaseRequestInfo data={purchaseRequest} />
							</div>
						))}

						<div className="flex justify-end">
							{(selectedPurchaseRequest || selectedPurchaseRequestOrder) && (
								<Button
									className="text-xs"
									disabled={updatingTransaction}
									onClick={handleUpdatePurchaseOrder}
								>
									{updatingTransaction ?
										<p>Saving..</p> :
										<p>Save</p>}
								</Button>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

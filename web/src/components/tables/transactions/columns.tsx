import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { CircleUser, ListTodo, NotepadText, TicketCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ITransaction, VoucherTypes } from "@/interfaces/transaction.interface";
import { VoucherBadge } from "@/components/badges/voucher-type";
import DeleteTransaction from "@/components/alert/transactions/delete";
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/interfaces/user.interface";
import Constants from "@/constants";

export const Columns: ColumnDef<ITransaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				className="border-white"
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "transactionNumber",
		header: () => <div className="flex items-center gap-x-2">
			<p>Transaction #</p>
			<CircleUser color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			if (!row.original.client) return;
			return (
				<div className="flex items-cetter gap-2">
					<span>{row.original.transactionNumber}</span>
				</div>
			)
		}
	},

	{
		id: "client",
		header: () => <div className="flex items-center gap-x-2">
			<p>Client</p>
			<CircleUser color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			if (!row.original.client) return;
			const { name } = row.original.client;
			return (
				<div className="flex items-cetter gap-2">
					<span>{name}</span>
				</div>
			)
		}
	},
	{
		id: "serialNumber",
		header: "SA Serial #",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.salesAgreement?.serialNumber ?? <span className="italic text-gray-300">No sales agreement attached</span>}
					</span>

				</div>
			)
		}
	},
	{
		id: "purchaseOrderId",
		header: "PO Serial #",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.purchaseOrder?.serialNumber ?? <span className="italic text-gray-300">No purchase order attached</span>}
					</span>
				</div>
			)
		}
	},
	{
		id: "voucherCount",
		header: () => <div className="flex items-center gap-x-2">
			<p>Vouchers</p>
			<TicketCheck color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			const { voucherCounts } = row.original;
			const totalVouchers = Object.values(voucherCounts).reduce((sum, count) => sum + count, 0);

			return (
				<div className="flex items-center gap-x-1">
					{totalVouchers > 0 ? (
						Object.entries(voucherCounts).map(([type, count]) => (
							count > 0 && (
								<VoucherBadge key={type} type={type as VoucherTypes} count={count} />
							)
						))
					) : (
						<span className="italic text-gray-300">No vouchers included</span>
					)}
				</div>
			);
		}
	},
	{
		id: "actions",
		header: () => <div className="flex items-center gap-x-2">
			<p>Actions</p>
			<ListTodo color="white" size={16} />
		</div>,
		enableHiding: false,
		cell: ({ row }) => {
			const { session: { user } } = useAuth();
			const { PermissionsCanDelete } = Constants;
			return (
				<div className="flex items-center justify-start gap-4">
					<Link to={`/${user?.userType === UserType.ADMIN ? 'admin' : 'employee'}/transactions/${row.original.id}`}>
						<NotepadText
							size={16}
							className="cursor-pointer hover:text-primary"
						/>
					</Link>
					{user?.permission && PermissionsCanDelete.includes(user.permission) && (
						<DeleteTransaction
							transactionId={row.original.id}
						/>
					)}
				</div>
			)
		},
	},
];

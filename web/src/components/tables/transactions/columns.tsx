import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import { ITransaction, VoucherTypes } from "@/interfaces/transaction.interface";
import { VoucherBadge } from "@/components/badges/voucher-type";

export const Columns: ColumnDef<ITransaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
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
		id: "id",
		header: "Transaction Voucher #",
		cell: ({ row }) => {
			if (!row.original.id) return;
			return (
				<div className="flex items-center gap-2">
					<span>{row.original.id}</span>
				</div>
			)
		}
	},
	{
		id: "lead",
		header: "Lead",
		cell: ({ row }) => {
			if (!row.original.lead) return;
			const { firstName, lastName, avatar } = row.original.lead;
			return (
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage src={avatar} />
						<AvatarFallback>
							{firstName[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<span>{`${firstName} ${lastName}`}</span>
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
		header: "Vouchers",
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
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-center gap-4">
					<Link to={`/admin/transactions/${row.original.id}`}>
						<NotepadText
							size={16}
							className="cursor-pointer hover:text-primary"
						/>
					</Link>
				</div>
			)
		},
	},
];

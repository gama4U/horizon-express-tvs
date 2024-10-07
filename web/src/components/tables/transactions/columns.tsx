import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import { ITransaction } from "@/interfaces/transaction.interface";

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
		id: "salesAgreementId",
		header: "Sales Agreement #",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.salesAgreementId ?? <span className="italic text-gray-300">No sales agreement attached</span>}
					</span>

				</div>
			)
		}
	},
	{
		id: "salesAgreementId",
		header: "Purchase Order Id",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.purchaseOrderId ?? <span className="italic text-gray-300">No purchase order attached</span>}
					</span>
				</div>
			)
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

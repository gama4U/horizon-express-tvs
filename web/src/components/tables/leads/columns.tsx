import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteTransaction from "@/components/alert/transactions/delete";
import { ILead } from "@/api/mutations/lead.mutation";
import EditLeadDialog from "@/components/dialogs/leads/edit";

export const Columns: ColumnDef<ILead>[] = [
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
		id: "lead",
		header: "Name",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span>{`${row.original.firstName} ${row.original.middleName} ${row.original.lastName}`}</span>
				</div>
			)
		}
	},
	{
		id: "contactNumber",
		header: "Contact Number",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.contactNumber}
					</span>

				</div>
			)
		}
	},
	{
		id: "email",
		header: "Email Address",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.contactNumber}
					</span>

				</div>
			)
		}
	},
	{
		id: "transactions",
		header: "Transactions",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-x-1">
					<span className="italic text-gray-300">No transactions included</span>
				</div>
			);
		}
	},
	{
		id: "actions",
		header: "Actions",
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<div className="flex items-center justify-start gap-4">
					<Link to={`/admin/leads/${row.original.id}`}>
						<NotepadText
							size={16}
							className="cursor-pointer hover:text-primary"
						/>
					</Link>
					<EditLeadDialog
						leadData={row.original}
					/>
					<DeleteTransaction
						transactionId={row.original.id}
					/>
				</div>
			)
		},
	},
];

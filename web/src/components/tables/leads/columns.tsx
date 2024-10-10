import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import DeleteTransaction from "@/components/alert/transactions/delete";
import { ILead } from "@/api/mutations/lead.mutation";
import EditLeadDialog from "@/components/dialogs/leads/edit";
import EmailLink from "@/components/common/email";

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
					<EmailLink email={row.original.email} />
				</div>
			)
		}
	},
	{
		id: "transactions",
		header: "Transactions Count",
		cell: ({ row }) => {
			const transactions = row.original.transactions;
			return (
				<div className="flex items-center gap-x-1">
					{transactions && transactions.length > 0 ? (
						<span className="text-xs text-center">{transactions.length}</span>
					) : (
						<span className="italic text-gray-300">No transactions</span>
					)}
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

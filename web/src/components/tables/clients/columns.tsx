import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import EditClientDialog from "@/components/dialogs/clients/edit";
import EmailLink from "@/components/common/email";
import DeleteLeadDialog from "@/components/alert/client/delete";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import ClientTypeBadge from "@/components/badges/client-type";
import { IClient } from "@/api/mutations/client.mutation";

export const Columns: ColumnDef<IClient>[] = [
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
					<span>{row.original.name}</span>
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
		id: "typeOfClient",
		header: "Client type",
		cell: ({ row }) => (
			<ClientTypeBadge
				value={row.original.clientType}
			/>
		)
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
		id: "department",
		header: "Department",
		cell: ({ row }) => {
			if (!row.original.department) {
				return (
					<span className="text-xs italic text-muted-foreground">
						No department assigned
					</span>
				)
			}
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.department}
					</span>
				</div>
			)
		}
	},
	{
		id: "officeBranch",
		header: "Office Branch",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<EmailLink email={row.original.officeBranch} />
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
			const { session: { user } } = useAuth();
			const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
			return (
				<div className="flex items-center justify-start gap-4">
					{(user?.permission && PermissionsCanEdit.includes(user.permission)) && (
						<EditClientDialog
							clientData={row.original}
						/>
					)}
					{(user?.permission && PermissionsCanDelete.includes(user.permission)) && (
						<DeleteLeadDialog
							clientId={row.original.id}
						/>
					)}
				</div>
			)
		},
	},
];

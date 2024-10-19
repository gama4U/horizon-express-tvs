import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import EditClientDialog from "@/components/dialogs/clients/edit";
import EmailLink from "@/components/common/email";
import DeleteLeadDialog from "@/components/alert/client/delete";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import ClientTypeBadge from "@/components/badges/client-type";
import { IClient } from "@/api/mutations/client.mutation";
import { CircleUserRound, ListTodo, Mail, MapPinHouse, ReceiptText } from "lucide-react";

export const Columns: ColumnDef<IClient>[] = [
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
		id: "name",
		header: () => <div className="flex items-center gap-x-2">
			<p>Name</p>
			<CircleUserRound color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span>{row.original.name}</span>
				</div>
			)
		}
	},
	{
		id: "email",
		header: () => <div className="flex items-center gap-x-2">
			<p>Email</p>
			<Mail color="white" size={16} />
		</div>,

		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<EmailLink email={row.original.email} />
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
		id: "department",
		header: () => <div className="flex items-center gap-x-2">
			<p>Department</p>
			<MapPinHouse color="white" size={16} />
		</div>,
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
		header: () => <div className="flex items-center gap-x-2">
			<p>Branch</p>
			<MapPinHouse color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.officeBranch}
					</span>
				</div>
			)
		}
	},
	{
		id: "transactions",
		header: () => <div className="flex items-center gap-x-2">
			<p>Transactions</p>
			<ReceiptText color="white" size={16} />
		</div>,
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
		header: () => <div className="flex items-center gap-x-2">
			<p>Actions</p>
			<ListTodo color="white" size={16} />
		</div>,
		enableHiding: false,
		cell: ({ row }) => {
			const { session: { user } } = useAuth();
			const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
			return (
				<div className="flex items-center justify-start gap-4">
					{(user?.permission && PermissionsCanEdit.includes(user.permission)) ? (
						<EditClientDialog
							clientData={row.original}
						/>
					) :
						<p className="text-xs text-muted-foreground text-center italic">None</p>
					}
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

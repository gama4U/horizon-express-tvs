import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import { ISupplier } from "@/api/mutations/supplier.mutation";
import EditSupplierDialog from "@/components/dialogs/suppliers/edit";
import DeleteSupplierDialog from "@/components/alert/supplier/delete";
import { CircleUserRound, ListTodo, Map, MapPinHouse, NotepadText, Phone } from "lucide-react";

export const Columns: ColumnDef<ISupplier>[] = [
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
		id: "contactNumber",
		header: () => <div className="flex items-center gap-x-2">
			<p>Contact Number</p>
			<Phone color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.contact}
					</span>
				</div>
			)
		}
	},
	{
		id: "address",
		header: () => <div className="flex items-center gap-x-2">
			<p>Address</p>
			<Map color="white" size={16} />
		</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.address}
					</span>
				</div>
			)
		}
	},
	{
		id: "category",
		header: () => <div className="flex items-center gap-x-2">
			<p>Category</p>
		</div>,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.category}
					</span>
				</div>
			)
		}
	},
	{
		id: "officeBranch",
		header: () => <div className="flex items-center gap-x-2">
			<p>Office Branch</p>
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
		id: "purchaseOrders",
		header: () => <div className="flex items-center gap-x-2">
			<p>Purchase Request Order Count</p>
			<NotepadText color="white" size={16} />
		</div>,

		cell: ({ row }) => {
			const purchaseOrders = row.original.purchaseOrders;
			return (
				<div className="flex items-center gap-x-1">
					{purchaseOrders && purchaseOrders.length > 0 ? (
						<span className="text-xs text-center">{purchaseOrders.length}</span>
					) : (
						<span className="italic text-gray-300">No purchase orders</span>
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
					{(user?.permission && PermissionsCanEdit.includes(user.permission)) && (
						<EditSupplierDialog
							supplierData={row.original}
						/>
					)}
					{(user?.permission && PermissionsCanDelete.includes(user.permission)) && (
						<DeleteSupplierDialog
							supplierId={row.original.id}
						/>
					)}
				</div>
			)
		},
	},
];

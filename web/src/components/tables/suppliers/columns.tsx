import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import { ISupplier } from "@/api/mutations/supplier.mutation";
import EditSupplierDialog from "@/components/dialogs/suppliers/edit";
import DeleteSupplierDialog from "@/components/alert/supplier/delete";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, ListTodo, Map, MapPinHouse, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
		accessorKey: "name",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();
			return (
				<Button
					variant="ghost"
					className="text-xs"
					onClick={() => { column.toggleSorting(column.getIsSorted() === "asc") }}
				>
					Name
					{isSorted === "asc" && <ArrowUpAZ className="ml-2 h-4 w-4" />}
					{isSorted === "desc" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
					{!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}				</Button>
			)
		},
		enableSorting: true,
	},
	{
		id: "contactNumber",
		header: () => <div className="flex items-center gap-x-2">
			<p>Contact</p>
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
		header: () => (
			<div className="flex items-center gap-x-2 w-32 truncate">
				<p className="truncate">Address</p>
				<Map color="white" size={16} />
			</div>
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs truncate">
						{row.original.address}
					</span>
				</div>
			)
		}
	}, {
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

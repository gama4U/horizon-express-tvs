import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { IMemorandum } from "@/api/queries/memorandums.query";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteMemorandum from "@/components/alert/memorandum/delete";

export const Columns: ColumnDef<IMemorandum>[] = [
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
		id: "memorandumNumber",
		header: "Memorandum #",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span>{`${row.original.memorandumNumber}`}</span>
				</div>
			)
		}
	},
	{
		id: "to",
		header: "To",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.to}
					</span>
				</div>
			)
		}
	},
	{
		id: "re",
		header: "Re",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.re}
					</span>
				</div>
			)
		}
	},
	{
		id: "addressee",
		header: "Addressee",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<span className="text-xs">
						{row.original.addressee}
					</span>
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
					<Link to={`/admin/memorandum/${row.original.id}`}>
						<NotepadText
							size={16}
							className="cursor-pointer hover:text-primary"
						/>
					</Link>
					<DeleteMemorandum
						memorandumId={row.original.id}
					/>
				</div>
			)
		},
	},
];

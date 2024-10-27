import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { IPackage } from "@/interfaces/package.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Columns: ColumnDef<IPackage>[] = [
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
    id: "creator",
    header: "Creator",
    cell: ({ row }) => {
      if (!row.original.creator) return;
      const { firstName, lastName, avatar } = row.original.creator;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} className="object-cover" />
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
    id: "packageNumber",
    header: "Package no.",
    cell: ({ row }) => (
      <span>
        {row.original.packageNumber}
      </span>
    ),
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.name}
      </span>
    ),
  },
  {
    id: "approver",
    header: "Approved by",
    cell: ({ row }) => (
      <span>
        {`
          ${row.original.approver?.firstName}
          ${row.original.approver?.lastName}
        `}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          {/* <EditUserDialog
            data={row.original}
          />
          <DeleteUserDialog
            userId={row.original.id}
          /> */}
        </div>
      )
    },
  },
];

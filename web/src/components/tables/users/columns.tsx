import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { IUser } from "@/interfaces/user.interface";

export const Columns: ColumnDef<IUser>[] = [
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
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>
              {row.original.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
        </div>
      )
    }
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.email}
      </span>
    ),
  },
  {
    id: "userType",
    header: "User type",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.userType}
      </span>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          {/* <EditSalesAgreementDialog 
            data={row.original}
          />
          <DeleteSalesAgreement 
            salesAgreementId={row.original.id}
          /> */}
        </div>
      )
    },
  },
];

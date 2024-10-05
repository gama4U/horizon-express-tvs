import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ISalesAgreement } from "../../../interfaces/sales-agreement.interface";
import ClientTypeBadge from "../../badges/client-type";
import { NotepadText, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import EditSalesAgreementDialog from "../../dialogs/sales-agreement/edit";
import DeleteSalesAgreement from "../../alert/sales-agreement/delete";

export const Columns: ColumnDef<ISalesAgreement>[] = [
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
    id: "creator ",
    header: "Creator",
    cell: ({ row }) => {
      if(!row.original.creator) return;
      const {firstName, lastName, avatar} = row.original.creator;
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
    id: "clientName",
    header: "Client",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.clientName}
      </span>
    ),
  },
  {
    id: "serialNumber ",
    header: "Ser. No.",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.serialNumber}
      </span>
    )
  },
  {
    id: "typeOfClient",
    header: "Client type",
    cell: ({ row }) => (
      <ClientTypeBadge 
        value={row.original.typeOfClient}
      />
    )
  },
  {
    id: "preparedBy",
    header: "Prepared by",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.preparedBy}
      </span>
    )
  },
  {
    id: "approvedBy",
    header: "Approved by",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.approvedBy}
      </span>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/admin/sales-agreements/${row.original.id}`}>
            <NotepadText 
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          <EditSalesAgreementDialog 
            data={row.original}
          />
          <DeleteSalesAgreement 
            salesAgreementId={row.original.id}
          />
        </div>
      )
    },
  },
];

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import { IPurchaseRequestOrder } from "@/interfaces/purchase-request.interface";
import PaymentTypeBadge from "@/components/badges/payment-type";
import PurchaseRequestTypeBadge from "@/components/badges/purchase-request-type";
import EditPurchaseRequestDialog from "@/components/dialogs/purchase-request/edit";
import DeletePurchaseRequest from "@/components/alert/purchse-request/delete";

export const Columns: ColumnDef<IPurchaseRequestOrder>[] = [
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
    id: "creator",
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
    id: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.suppliersName}
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
    id: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize">
        <PurchaseRequestTypeBadge 
          value={row.original.type}
        />
      </span>
    )
  },
  {
    id: "payment",
    header: "Payment type",
    cell: ({ row }) => (
      <span className="capitalize">
        <PaymentTypeBadge
          value={row.original.paymentType}
        />
      </span>
    )
  },
  {
    id: "expenses",
    header: "Expenses",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.expenses}
      </span>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/admin/purchase-requests/${row.original.id}`}>
            <NotepadText 
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          <EditPurchaseRequestDialog 
            data={row.original}
          />
          <DeletePurchaseRequest
            purchaseRequestId={row.original.id}
          />
        </div>
      )
    },
  },
];

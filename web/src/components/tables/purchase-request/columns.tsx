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
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/interfaces/user.interface";
import Constants from "@/constants";

export const Columns: ColumnDef<IPurchaseRequestOrder>[] = [
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
    id: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.supplier?.name}
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
    header: "Disbursement Type",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.disbursementType}
      </span>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { session: { user } } = useAuth();
      const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
      return (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/${user?.userType === UserType.ADMIN ? 'admin' : 'employee'}/purchase-requests/${row.original.id}`}>
            <NotepadText
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          {(user?.permission && PermissionsCanEdit.includes(user.permission)) && (
            <EditPurchaseRequestDialog
              data={row.original}
            />
          )}
          {(user?.permission && PermissionsCanDelete.includes(user.permission)) && (
            <DeletePurchaseRequest
              purchaseRequestId={row.original.id}
            />
          )}
        </div>
      )
    },
  },
];

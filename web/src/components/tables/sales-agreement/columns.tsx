import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { ISalesAgreement } from "../../../interfaces/sales-agreement.interface";
import ClientTypeBadge from "../../badges/client-type";
import { CircleUser, NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import EditSalesAgreementDialog from "../../dialogs/sales-agreement/edit";
import DeleteSalesAgreement from "../../alert/sales-agreement/delete";
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/interfaces/user.interface";
import Constants from "@/constants";

export const Columns: ColumnDef<ISalesAgreement>[] = [
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
    id: "clientName",
    header: () => <div className="flex items-center gap-x-2">
      <p>Client</p>
      <CircleUser color="white" size={16} />
    </div>,
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.client.name}
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
        value={row.original.client.clientType}
      />
    )
  },
  {
    id: "preparedBy",
    header: "Prepared by",
    cell: ({ row }) => {
      const creator = row.original.creator;
      return (
        <span className="capitalize">
          {`${creator?.firstName} ${creator?.firstName}`}
        </span>
      )
    }
  },
  {
    id: "approvedBy",
    header: "Approved by",
    cell: ({ row }) => {
      const approver = row.original.approver;
      const approvedBy = `${approver?.firstName || ''} ${approver?.lastName || ''}`
      return (
        <span className="capitalize">
          {approvedBy}
        </span>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
      const { session: { user } } = useAuth();
      return (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/${user?.userType === UserType.ADMIN ? 'admin' : 'employee'}/sales-agreements/${row.original.id}`}>
            <NotepadText
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          {user?.permission && PermissionsCanEdit.includes(user?.permission) && (
            <EditSalesAgreementDialog
              data={row.original}
            />
          )}
          {user?.permission && PermissionsCanDelete.includes(user?.permission) && (
            <DeleteSalesAgreement
              salesAgreementId={row.original.id}
            />
          )}
        </div>
      )
    },
  },
];

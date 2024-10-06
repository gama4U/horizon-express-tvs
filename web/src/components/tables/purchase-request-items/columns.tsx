import { ColumnDef } from "@tanstack/react-table";
import { IPurchaseRequestOrderItem } from "@/interfaces/purchase-request-item.interface";
import DeletePurchaseRequestItem from "@/components/alert/purchse-request/delete-item";
import EditPurchaseRequestItemDialog from "@/components/dialogs/purchase-request/edit-item";

export const Columns: ColumnDef<IPurchaseRequestOrderItem>[] = [
  {
    id: "particulars",
    header: "Particulars",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.particulars}
      </span>
    ),
  },
  {
    id: "quantity",
    header: "Qty.",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.quantity.toLocaleString()}
      </span>
    )
  },
  {
    id: "unitPrice",
    header: "Unit price",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.unitPrice.toLocaleString()}
      </span>
    )
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.total.toLocaleString()}
      </span>
    )
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <EditPurchaseRequestItemDialog data={row.original} />
          <DeletePurchaseRequestItem purchaseRequestId={row.original.id}/>
        </div>
      )
    },
  },
];

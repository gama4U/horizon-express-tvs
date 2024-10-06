import { ColumnDef } from "@tanstack/react-table";
import EditSalesAgreementItemDialog from "../../dialogs/sales-agreement/edit-item";
import { ISalesAgreementItem } from "../../../interfaces/sales-agreement-item.interface";
import DeleteSalesAgreementItem from "../../alert/sales-agreement/delete-item";

export const Columns: ColumnDef<ISalesAgreementItem>[] = [
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
          <EditSalesAgreementItemDialog data={row.original} />
          <DeleteSalesAgreementItem salesAgreementItemId={row.original.id}/>
        </div>
      )
    },
  },
];

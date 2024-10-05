import { ColumnDef } from "@tanstack/react-table";
import { ISalesAgreementItem } from "../../../interfaces/sales-agreement.interface";

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
        {row.original.quantity}
      </span>
    )
  },
  {
    id: "unitPrice",
    header: "Unit price",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.unitPrice}
      </span>
    )
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.total}
      </span>
    )
  },
];

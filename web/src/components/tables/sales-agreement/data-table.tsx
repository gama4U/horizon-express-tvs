import { 
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState, 
  VisibilityState, 
  flexRender, 
  getCoreRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { ISalesAgreement } from "../../../interfaces/sales-agreement.interface";
import { Input } from "../../ui/input";
import { DataTablePagination } from "../../common/table-pagination";
import CreateSalesAgreementDialog from "../../dialogs/create-sales-agreement";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  onSearchChange: (value: string) => void;
  onPaginationChange: OnChangeFn<PaginationState>;
  pagination?: PaginationState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  onSearchChange,
  onPaginationChange,
  pagination
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    data: data,
    rowCount: total,
    manualPagination: true,
    onPaginationChange: onPaginationChange,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: row => (row as ISalesAgreement).id,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex-1 overflow-auto space-y-4">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-1 gap-2 items-center p-[1px]">
          <Input
            placeholder="Search by client name or serial no."
            className="max-w-[500px]" 
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <CreateSalesAgreementDialog/>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

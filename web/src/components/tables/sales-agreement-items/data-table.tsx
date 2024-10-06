import { 
  ColumnDef,
  flexRender, 
  getCoreRowModel, 
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-none">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-[12px]">
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
              className="border-none"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="text-[12px]">
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
              {loading 
                ? <Loader2 size={20} className="animate-spin m-auto"/> 
                : 'No results.'
              }
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

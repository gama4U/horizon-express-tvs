import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TopBar from "@/components/section/topbar";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import CommonInput from "@/components/common/input";
import { Columns } from "@/components/tables/suppliers/columns";
import { DataTable } from "@/components/tables/suppliers/data-table";
import { fetchSuppliers } from "@/api/queries/suppliers.query";
import CreateSupplierDialog from "@/components/dialogs/suppliers/add";
import { useAuth } from "@/providers/auth-provider";
import { OfficeBranch } from "@/interfaces/user.interface";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Constants from "@/constants";

export default function Suppliers() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false)
  const { branch } = useAuth()

  const [categoryFilter, setCategoryFilter] = useState('');

  const { SupplierCategories } = Constants;

  const { data, isLoading } = useQuery({
    queryKey: ['suppliers', pagination, debouncedSearch, categoryFilter],
    queryFn: async () => await fetchSuppliers({
      skip,
      take,
      search: debouncedSearch,
      branch: branch as OfficeBranch,
      ...(categoryFilter !== 'All' ? { category: categoryFilter } : null)
    })
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Suppliers
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage suppliers' records here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
              placeholder="Search by name or address or category"
              containerProps={{
                className: "max-w-[500px]"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
              <SelectTrigger className="max-w-[250px] bg-slate-100 border-none text-[12px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={'All'}
                  className="text-[12px]"
                >
                  All categories
                </SelectItem>
                {SupplierCategories.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item}
                    className="text-[12px]"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size={"sm"}
            onClick={() => setOpenCreateSupplier(true)}
            className="flex gap-x-2"
          >
            <Plus size={14} />
            <span>Create</span>
          </Button>
        </div>
        <DataTable
          columns={Columns}
          data={data?.suppliersData ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
      <CreateSupplierDialog openDialog={openCreateSupplier} setOpenDialog={setOpenCreateSupplier} />
    </div>
  )
}

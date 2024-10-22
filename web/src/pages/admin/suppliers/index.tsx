import { Check, ChevronsUpDown, Plus } from "lucide-react";
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
import Constants from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function Suppliers() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false)
  const { branch } = useAuth()
  const [openCategoryFilter, setOpenCategoryFilter] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('');

  const { SupplierCategories } = Constants;

  const { data, isLoading } = useQuery({
    queryKey: ['suppliers', pagination, debouncedSearch, categoryFilter, branch],
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
        <div className="flex items-center justify-between py-1 gap-x-2">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
              placeholder="Search by name or address or category"
              containerProps={{
                className: "w-full"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Popover open={openCategoryFilter} onOpenChange={setOpenCategoryFilter}>
              <PopoverTrigger asChild className="text-[12px]">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCategoryFilter}
                  className="w-[200px] justify-between"
                >
                  {categoryFilter
                    ? SupplierCategories.find((item) => item === categoryFilter)
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 text-[12px]">
                <Command>
                  <CommandInput className="text-[12px]" placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty className="text-[12px]">No category found.</CommandEmpty>
                    <CommandGroup>
                      {SupplierCategories.map((item, index) => (
                        <CommandItem
                          key={index}
                          value={item}
                          className="text-[12px]"
                          onSelect={(currentValue) => {
                            setCategoryFilter(currentValue === categoryFilter ? "" : currentValue)
                            setOpenCategoryFilter(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              categoryFilter === item ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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

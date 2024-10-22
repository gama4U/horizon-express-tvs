import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TopBar from "@/components/section/topbar";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import CommonInput from "@/components/common/input";
import { Columns } from "@/components/tables/clients/columns";
import { fetchClients } from "@/api/queries/clients.query";
import CreateClientDialog from "@/components/dialogs/clients/add";
import { DataTable } from "@/components/tables/clients/data-table";
import { useAuth } from "@/providers/auth-provider";

export default function Clients() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openCreateClient, setOpenCreateClient] = useState(false)
  const { branch } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['clients', pagination, debouncedSearch, branch],
    queryFn: async () => await fetchClients({ skip, take, search: debouncedSearch, branch })
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Clients
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage clients' records here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
              searchBar
              placeholder="Search by name or email"
              containerProps={{
                className: "max-w-[500px]"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Button
            size={"sm"}
            onClick={() => setOpenCreateClient(true)}
            className="flex gap-x-2"
          >
            <Plus size={14} />
            <span>Create</span>
          </Button>
        </div>
        <DataTable
          columns={Columns}
          data={data?.clientsData ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
      <CreateClientDialog openDialog={openCreateClient} setOpenDialog={setOpenCreateClient} />
    </div>
  )
}

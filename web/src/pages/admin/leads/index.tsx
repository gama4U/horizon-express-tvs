import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import TopBar from "@/components/section/topbar";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import CommonInput from "@/components/common/input";
import { DataTable } from "@/components/tables/leads/data-table";
import { Columns } from "@/components/tables/leads/columns";
import { fetchLeads } from "@/api/queries/leads.query";
import CreateLeadDialog from "@/components/dialogs/leads/add";

export default function Leads() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openCreateLead, setOpenCreateLead] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['leads', pagination, debouncedSearch],
    queryFn: async () => await fetchLeads({ skip, take, search: debouncedSearch })
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Leads
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage leads' records here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
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
            onClick={() => setOpenCreateLead(true)}
            className="flex gap-x-2"
          >
            <Plus size={14} />
            <span>Create</span>
          </Button>
        </div>
        <DataTable
          columns={Columns}
          data={data?.leadsData ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
      <CreateLeadDialog openDialog={openCreateLead} setOpenDialog={setOpenCreateLead} />
    </div>
  )
}

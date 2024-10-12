import { useQuery } from "@tanstack/react-query";
import TopBar from "../../../components/section/topbar";
import usePagination from "../../../hooks/usePagination";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import CommonInput from "../../../components/common/input";
import CreateMemorandumDialog from "@/components/dialogs/memorandum/add";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"
import { fetchMemorandums } from "@/api/queries/memorandums.query";
import { DataTable } from "@/components/tables/memorandums/data-table";
import { Columns } from "@/components/tables/memorandums/columns";
import { useAuth } from "@/providers/auth-provider";

export default function Memorandum() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const { session } = useAuth()
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [openCreateMemo, setOpenCreateMemo] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['memorandums', pagination, debouncedSearch],
    queryFn: async () => await fetchMemorandums({
      skip,
      take,
      search,
    })
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Memorandums
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage memorandums here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
              placeholder="Search by client name or serial no."
              containerProps={{
                className: "max-w-[500px]"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Button
            size={"sm"}
            onClick={() => setOpenCreateMemo(true)}
            className="flex gap-x-2"
          >
            <Plus size={14} />
            <span>Create</span>
          </Button>
          <CreateMemorandumDialog openDialog={openCreateMemo} setOpenDialog={setOpenCreateMemo} creatorI={String(session.user.id)} />
        </div>
        <DataTable
          columns={Columns}
          loading={isLoading}
          data={data?.memorandumData ?? []}
          total={data?.total ?? 0}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

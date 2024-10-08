import { useQuery } from "@tanstack/react-query";
import TopBar from "../../../components/section/topbar";
import usePagination from "../../../hooks/usePagination";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import CommonInput from "../../../components/common/input";
import Loader from "@/components/animated/Loader";
import { fetchUsers } from "@/api/queries/user.query";
import { DataTable } from "@/components/tables/users/data-table";
import { Columns } from "@/components/tables/users/columns";

export default function Users() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['users', pagination, debouncedSearch],
    queryFn: async () => await fetchUsers({
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
            Sales Agreements
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage sales agreements here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex gap-2 justify-between">
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
          {/* <CreateSalesAgreementDialog /> */}
        </div>
        <Loader isLoading={isLoading} type="skeleton" />
        <DataTable
          columns={Columns}
          data={data?.users ?? []}
          total={data?.total ?? 0}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

import { useQuery } from "@tanstack/react-query";
import TopBar from "../../components/section/topbar";
import { Columns } from "../../components/tables/sales-agreement/clumns";
import { DataTable } from "../../components/tables/sales-agreement/data-table";
import usePagination from "../../hooks/usePagination";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { fetchSalesAgreements } from "../../api/queries/sales-agreements";

export default function SalesAgreement() {
  const {skip, take, pagination, onPaginationChange} = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const {data} = useQuery({
    queryKey: ['sales-agreements', pagination, debouncedSearch],
    queryFn: async() => await fetchSalesAgreements({skip, take, search})
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Sales agreements
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage sales agreements here.</p>
        }
      />
      <div className="flex items-center justify-between bg-white p-4 rounded-lg">
        <DataTable 
          columns={Columns}
          data={data?.salesAgreements ?? []}
          total={data?.total ?? 0}
          onPaginationChange={onPaginationChange}
          onSearchChange={(value) => setSearch(value)}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

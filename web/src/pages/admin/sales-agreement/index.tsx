import { useQuery } from "@tanstack/react-query";
import TopBar from "../../../components/section/topbar";
import { Columns } from "../../../components/tables/sales-agreement/clumns";
import { DataTable } from "../../../components/tables/sales-agreement/data-table";
import usePagination from "../../../hooks/usePagination";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { fetchSalesAgreements } from "../../../api/queries/sales-agreements";
import CreateSalesAgreementDialog from "../../../components/dialogs/sales-agreement/create";
import { ClientTypeFilter } from "../../../interfaces/sales-agreement.interface";
import CommonInput from "../../../components/common/input";
import ClientTypeFilterSelect from "../../../components/select/sales-agreement/client-type-filter";

export default function SalesAgreements() {
  const {skip, take, pagination, onPaginationChange} = usePagination();
  const [search, setSearch] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<ClientTypeFilter>('ALL');
  const debouncedSearch = useDebounce(search, 500);

  const {data, isLoading} = useQuery({
    queryKey: ['sales-agreements', pagination, debouncedSearch, clientTypeFilter],
    queryFn: async() => await fetchSalesAgreements({skip, take, search, typeOfClient: clientTypeFilter})
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
            <ClientTypeFilterSelect
              value={clientTypeFilter}
              onValueChange={(value) => setClientTypeFilter(value)}
            />
          </div>
          <CreateSalesAgreementDialog/>
        </div>
        <DataTable 
          columns={Columns}
          data={data?.salesAgreements ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

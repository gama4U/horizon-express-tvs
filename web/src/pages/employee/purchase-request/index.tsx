import { useQuery } from "@tanstack/react-query";
import TopBar from "../../../components/section/topbar";
import usePagination from "../../../hooks/usePagination";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import CommonInput from "../../../components/common/input";
import { fetchPurchaseRequestOrders } from "@/api/queries/purchase-request.queries";
import PaymentTypeFilterSelect from "@/components/select/purchase-request/payment-type-filter";
import { PaymentType, PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import PurchaseRequestTypeFilter from "@/components/select/purchase-request/type-filter";
import CreatePurchaseRequestDialog from "@/components/dialogs/purchase-request/create";
import { DataTable } from "@/components/tables/purchase-request/data-table";
import { Columns } from "@/components/tables/purchase-request/columns";
import { useAuth } from "@/providers/auth-provider";
import { OfficeBranch } from "@/interfaces/user.interface";

export default function PurchaseRequests() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PurchaseRequestOrderType | 'ALL'>('ALL');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<PaymentType | 'ALL'>('ALL');
  const debouncedSearch = useDebounce(search, 500);
  const { branch } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['purchase-requests', pagination, debouncedSearch, branch],
    queryFn: async () => await fetchPurchaseRequestOrders({
      skip,
      take,
      search,
      branch: branch as OfficeBranch,
    })
  });

  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Purchase Requests
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage purchase request here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex gap-2 justify-between">
          <div className="flex flex-1 gap-2 items-center p-[1px] gap-x-2">
            <CommonInput
              placeholder="Search by client name or serial no."
              containerProps={{
                className: "w-full"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <PurchaseRequestTypeFilter
              value={typeFilter}
              onValueChange={(value) => setTypeFilter(value)}
            />
            <PaymentTypeFilterSelect
              value={paymentTypeFilter}
              onValueChange={(value) => setPaymentTypeFilter(value)}
            />
          </div>
          <CreatePurchaseRequestDialog />
        </div>
        <DataTable
          columns={Columns}
          data={data?.purchaseRequests ?? []}
          loading={isLoading}
          total={data?.total ?? 0}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

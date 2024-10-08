import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "@/api/mutations/transaction.mutation";
import TopBar from "@/components/section/topbar";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { fetchTransactions } from "@/api/queries/transaction";
import CommonInput from "@/components/common/input";
import { DataTable } from "@/components/tables/transactions/data-table";
import { Columns } from "@/components/tables/transactions/columns";
import CommonToast from "@/components/common/toast";
import { VoucherTypeFilter } from "@/components/custom/voucher-type-filter";
import { VoucherFilters, VoucherTypes } from "@/interfaces/transaction.interface";

export default function Transactions() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const [voucherFilters, setVoucherFilters] = useState<VoucherFilters>({
    travel: false,
    accommodation: false,
    tour: false,
    transport: false
  });


  const { data, isLoading } = useQuery({
    queryKey: ['transactions', pagination, debouncedSearch, voucherFilters],
    queryFn: async () => await fetchTransactions({ skip, take, search: debouncedSearch, ...voucherFilters })
  });


  const navigate = useNavigate();

  const { mutate: createTransactionMutate, isPending: creatingTransaction } = useMutation({
    mutationFn: async () => await createTransaction(),
    onError: (error) => {
      toast.error(error.message, {
        className: 'text-destructive',
        position: 'top-center',
      })
    },
    onSuccess: (data) => {
      toast.custom(() => (
        <CommonToast message="Successfully created transaction" />
      ), {
        position: "bottom-right",
      })
      navigate(`/admin/transactions/${data.id}/`);
    }
  });

  const handleVoucherFilterToggle = (type: VoucherTypes) => {
    setVoucherFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type]
    }));
  };
  return (
    <div className="space-y-2">
      <TopBar
        LeftSideHeader={
          <p className="text-sm">
            Transactions
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">Manage your Transactions here.</p>
        }
      />
      <div className="space-y-4 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-between py-1">
          <div className="flex flex-1 gap-2 items-center p-[1px]">
            <CommonInput
              placeholder="Search by transaction id or lead name"
              containerProps={{
                className: "max-w-[500px]"
              }}
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-row gap-x-1 bg-slate-100 rounded-sm p-2">
              {Object.values(VoucherTypes).map((type) => (
                <VoucherTypeFilter
                  key={type}
                  type={type}
                  selected={voucherFilters[type as keyof typeof voucherFilters]}
                  onToggle={handleVoucherFilterToggle}
                />
              ))}
            </div>
          </div>
          <Button
            size={"sm"}
            onClick={() => createTransactionMutate()}
            className="flex gap-x-2"
          >
            {creatingTransaction ? (
              <>
                <p>Creating...</p>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Create</span>
              </>
            )}
          </Button>
        </div>
        <DataTable
          columns={Columns}
          data={data?.transactions ?? []}
          total={data?.total ?? 0}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          pagination={pagination}
        />
      </div>
    </div>
  )
}

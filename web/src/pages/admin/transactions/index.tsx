import { Loader2 } from "lucide-react";
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

export default function Transactions() {
  const { skip, take, pagination, onPaginationChange } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['transactions', pagination, debouncedSearch],
    queryFn: async () => await fetchTransactions({ skip, take, search })
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
            variant='outline'
            onClick={() => createTransactionMutate()}
            className="gap-1 flex items-center text-xs"
          >
            {creatingTransaction ? (
              <>
                <p>Creating...</p>
                <Loader2 size={18} className="animate-spin" />
              </>
            ) : (
              <>
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
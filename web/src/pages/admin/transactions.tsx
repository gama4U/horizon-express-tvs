import { Loader2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../../api/mutations/transaction.mutation";
import TopBar from "../../components/section/topbar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { transactionAtom } from "../../utils/atoms";

export default function Transactions() {

  const [transactionData, setTransactionData] = useRecoilState(transactionAtom)
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
      setTransactionData({
        ...transactionData,
        transactionNumber: data.id
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
      <div className="flex justify-between bg-white rounded-xl p-4 h-screen">
        <h1>Transactions</h1>
        <Button
          onClick={() => createTransactionMutate()}
          className="gap-1 flex items-center"
        >
          {creatingTransaction ? (
            <>
              <Loader2 size={18} className="animate-spin" />
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Create</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

import { Loader2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../../api/mutations/transaction.mutation";

export default function Transactions() {
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
      navigate(`/admin/transactions/${data.id}/manage`);
    }
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1>Transactions</h1>
        <Button
          onClick={() => createTransactionMutate()}
          className="gap-1"
        >
          {creatingTransaction ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Creating...</span>
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

import { useParams } from "react-router-dom";
import BackButton from "../../components/buttons/back";
import Accommodation from "../../components/section/accommodation";

export default function ManageTransaction() {
  const {id} = useParams()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <BackButton />
        <h1 className="font-semibold text-[16px]">Manage transaction</h1>
      </div>
      <Accommodation
        transactionId={String(id)}
        accommodation={undefined}
      />
    </div>
  )
}

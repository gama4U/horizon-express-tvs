import CreateSalesAgreementDialog from "../../components/dialogs/create-sales-agreement";
import { Input } from "../../components/ui/input";

export default function SalesAgreement() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Input 
          className="bg-white max-w-[500px]"
          placeholder="Search"
        />
        <CreateSalesAgreementDialog />
      </div>
    </div>
  )
}

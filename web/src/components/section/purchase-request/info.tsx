import { IPurchaseRequestOrder } from "@/interfaces/purchase-request.interface"
import PurchaseRequestTypeBadge from "@/components/badges/purchase-request-type"
import PaymentTypeBadge from "@/components/badges/payment-type"

interface Props {
  data: IPurchaseRequestOrder
}

export default function PurchaseRequestInfo({data}: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Creator
          </span>
          <h3 className="text-[12px]">
            {`${data.creator?.firstName} ${data.creator?.lastName}`}
          </h3>
        </div>
        <div>
          <span className="text-muted-foreground text-[10px]">
            Ser. no.
          </span>
          <h3 className="text-[12px]">
            {data.serialNumber}
          </h3>
        </div>
        <div>
          <span className="text-muted-foreground text-[10px]">
            Supplier's name
          </span>
          <h3 className="text-[12px]">
            {data.suppliersName}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Type
          </span>
          <PurchaseRequestTypeBadge
            value={data.type} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Payment type
          </span>
          <PaymentTypeBadge
            value={data.paymentType} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Expenses
          </span>
          <h3 className="text-[12px]">
            {data.expenses}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Nos.
          </span>
          <h3 className="text-[12px]">
            {data.nos}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Others.
          </span>
          <h3 className="text-[12px]">
            {data.other}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-4">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Prepared by
          </span>
          <h3 className="text-[12px]">
            {`${data.creator?.firstName || ''} ${data.creator?.lastName || ''}`}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">
            Approved by
          </span>
          <h3 className="text-[12px]">
            {`${data.approver?.firstName || ''} ${data.approver?.lastName || ''}`}
          </h3>
        </div>
      </div>
    </>
  )
}

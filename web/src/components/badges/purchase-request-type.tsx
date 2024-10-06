import { PurchaseRequestOrderType } from "@/interfaces/purchase-request.interface";
import { Badge } from "../ui/badge";

interface Props {
  value: PurchaseRequestOrderType;
}

const badgeStyleMap: Record<PurchaseRequestOrderType, string> = {
  HOTEL: 'bg-green-100 hover:bg-green-200',
  INTERNATIONAL_PACKAGE: 'bg-purple-100 hover:bg-purple-200',
  LOCAL_PACKAGE: 'bg-orange-100 hover:bg-orange-200',
  TICKET: 'bg-yellow-100 hover:bg-yellow-200',
  VISA: 'bg-blue-100 hover:bg-blue-200',
}

const labelMap: Record<PurchaseRequestOrderType, string> = {
  HOTEL: 'Hotel',
  INTERNATIONAL_PACKAGE: 'International Package',
  LOCAL_PACKAGE: 'Local Package',
  TICKET: 'Ticket',
  VISA: 'Visa',
}

export default function PurchaseRequestTypeBadge({value}: Props) {
  return (
    <Badge
      className={`text-slate-700 ${badgeStyleMap[value]} cursor-default text-[10px] w-fit min-w-[125px] justify-center`}
    >
      {labelMap[value]}
    </Badge>
  )
}

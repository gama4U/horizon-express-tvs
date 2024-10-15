import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { PurchaseRequestOrderType } from '@/interfaces/purchase-request.interface';

interface Props {
  value: PurchaseRequestOrderType | 'ALL';
  onValueChange: (value: PurchaseRequestOrderType | 'ALL') => void;
}

const paymentLabelMap: Record<PurchaseRequestOrderType | 'ALL', string> = {
  ALL: "All Type",
  ACCOMMODATION: 'Accommodation',
  SHIPPING: 'Shipping',
  TRANSPORTATION_RENTAL: 'Transportation Rental',
  VISA: 'Visa',
  INTERNATIONAL_AIRLINE_TICKETING: 'International Airline Ticketing',
  DOMESTIC_AIRLINE_TICKETING: 'Domestic Airline Ticketing',
}

export default function PurchaseRequestTypeFilter({ value, onValueChange }: Props) {
  return (
    <Select onValueChange={onValueChange} value={value ?? 'all'}>
      <SelectTrigger className="w-fit min-w-[150px] h-[40px] py-0 gap-[12px] text-muted-foreground bg-slate-100 border-none text-[12px]">
        <SelectValue placeholder="Select a verified email to display" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(paymentLabelMap).map(([value, label], index) => (
          <SelectItem
            key={index}
            value={value}
            className="text-[12px] text-muted-foreground"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { ClientTypeFilter } from '../../../interfaces/sales-agreement.interface'
import Constants from '../../../constants';

interface Props {
  value: ClientTypeFilter;
  onValueChange: (value: ClientTypeFilter) => void;
}

export default function ClientTypeFilterSelect({value, onValueChange}: Props) {
  return (
    <Select onValueChange={onValueChange} value={value ?? 'all'}>
      <SelectTrigger className="w-fit min-w-[150px] h-[40px] py-0 gap-[12px] text-muted-foreground bg-slate-100 border-none text-[12px]">
        <SelectValue placeholder="Select a verified email to display" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={'ALL'}
          className="text-[12px] text-muted-foreground"
        >
          All
        </SelectItem>
        {Object.entries(Constants.ClientTypesMap).map(([value, label], index) => (
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
